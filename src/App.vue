<template>
  <v-app>
    <v-main>
      <div class="wrapper">
        <AppNavbar />
        <router-view />
        <NotificationMsg v-if="arrayNotification.length" />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue";
import NotificationMsg from "@/components/modals/NotificationMsg.vue";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: { AppNavbar, NotificationMsg },
  beforeMount() {
    this.$store.dispatch("tasks/setTodayDate");
    this.$store.dispatch("tasks/pushToDailyTodos", "example");
  },
  computed: {
    ...mapGetters({
      arrayNotification: "modals/arrayNotification",
    }),
  },
};
</script>

<style></style>
