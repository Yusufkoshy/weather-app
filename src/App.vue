<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-sky-800">
    <SiteNavigation />
    <router-view class="flex-1" v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
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
