<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-sky-800">
    <SiteNavigation />
    <router-view />
  </div>
</template>

<script setup>
import SiteNavigation from "./components/site-navigation.vue";
</script>
