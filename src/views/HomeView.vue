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
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

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
