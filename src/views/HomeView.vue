<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <form @submit.prevent="getSearchResults" action="#">
        <input
          @input="getSearchResults"
          type="text"
          v-model="searchQuery"
          placeholder=" Search for a city or state"
          class="py-2 px-1 w-full bg-transparent border-b focus:border-sky-300 focus:outline-none focus:shadow-[0px_1px_0_0_#004e71]"
        />
      </form>
      <ul
        v-if="mapBoxSearchResults"
        class="bg-sky-700 text-white absolute w-full shadow-md py-2 px-1 top-[60px]"
      >
        <p v-if="searchError">Sorry, something went wrong, please try again.</p>
        <p v-if="!searchError && mapBoxSearchResults.length === 0">
          No results match your query, try a different term.
        </p>
        <li
          v-for="result in mapBoxSearchResults"
          :key="result.id"
          class="py-2 cursor-pointer hover:bg-sky-800"
          @click="showCity(result)"
        >
          {{ result.place_name }}
        </li>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <div class="text-center max-w-[30px]">
            <svg
              version="1.1"
              id="L2"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              enable-background="new 0 0 100 100"
              xml:space="preserve"
            >
              <circle
                fill="none"
                stroke="#fff"
                stroke-width="4"
                stroke-miterlimit="10"
                cx="50"
                cy="50"
                r="48"
              />
              <line
                fill="none"
                stroke-linecap="round"
                stroke="#fff"
                stroke-width="4"
                stroke-miterlimit="10"
                x1="50"
                y1="50"
                x2="85"
                y2="50.5"
              >
                <animateTransform
                  attributeName="transform"
                  dur="2s"
                  type="rotate"
                  from="0 50 50"
                  to="360 50 50"
                  repeatCount="indefinite"
                />
              </line>
              <line
                fill="none"
                stroke-linecap="round"
                stroke="#fff"
                stroke-width="4"
                stroke-miterlimit="10"
                x1="50"
                y1="50"
                x2="49.5"
                y2="74"
              >
                <animateTransform
                  attributeName="transform"
                  dur="15s"
                  type="rotate"
                  from="0 50 50"
                  to="360 50 50"
                  repeatCount="indefinite"
                />
              </line>
            </svg>
          </div>
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "@/components/CityList.vue";

const mapboxApiKey =
  "pk.eyJ1IjoieXVzdWYta29zaHkiLCJhIjoiY2xubHE4b2oxMjh6NzJtcnV2cnl0YzEzaiJ9.ccYahr31CQpPQl56xVN5Fw";
const searchQuery = ref("");
const queryTimeout = ref(null);
const mapBoxSearchResults = ref(null);
const searchError = ref(null);
const router = useRouter();

const showCity = (result) => {
  const [city, state] = result.place_name.split(",");
  if (!state || !city) {
    return;
  }
  router.push({
    name: "cityView",
    params: { state: state.replaceAll(" ", ""), city: city },
    query: {
      lat: result.geometry.coordinates[1],
      lng: result.geometry.coordinates[0],
      preview: true,
    },
  });
};

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const results = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxApiKey}&types=place`
        );
        mapBoxSearchResults.value = results.data.features;
      } catch {
        searchError.value = true;
      }
      return;
    }
    mapBoxSearchResults.value = null;
  }, 300);
};
</script>
