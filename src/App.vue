<template>
  <div class="wrapper">
    <AppNavbar />

    <router-view />
  </div>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue";

export default {
  name: "App",
  components: { AppNavbar },
};
</script>

<style></style>
