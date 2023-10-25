<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-sky-800">
    <SiteNavigation />
    <router-view class="flex-1" v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
    <footer
      v-motion
      :initial="{
        opacity: 0,
        y: 200,
      }"
      :visible="{
        opacity: 1,
        y: 0,
        delay: 900,
      }"
      class="w-full text-center my-4 text-stone-400"
    >
      <p>Copyright © 2023 Yusuf - Development.</p>
    </footer>
  </div>
</template>

<script setup>
import SiteNavigation from "./components/site-navigation.vue";
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: 200ms ease all;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
