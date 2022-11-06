<template>
  <v-app>
    <v-main>
      <div class="wrapper">
        <AppNavbar />
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue";
export default {
  name: "App",
  components: { AppNavbar },
  beforeMount() {
    console.log("APP");
  },
};
</script>

<style></style>
