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

    // if (this.$store.state.tasks.todos.length) {
    //   this.$store.dispatch("tasks/checkDeadline", "global");
    //   this.$store.dispatch("tasks/sortTasks", "global");
    // }
    // if (this.$store.state.tasks.dailyTodos.length) {
    //   this.$store.dispatch("tasks/checkDeadline", "daily");
    //   this.$store.dispatch("tasks/sortTasks", "daily");
    // }

    // if (this.$store.state.tasks.dailyDoneTodos.length) {
    //   this.$store.dispatch("tasks/checkDeadline", "doneDaily");
    //   this.$store.dispatch("tasks/sortTasks", "doneDaily");
    // }

    // if (this.$store.state.tasks.deletedTodos.length) {
    //   this.$store.dispatch("tasks/checkDeadline", "deleted");
    //   this.$store.dispatch("tasks/sortTasks", "deleted");
    // }
  },
  computed: {
    ...mapGetters({
      arrayNotification: "modals/arrayNotification",
    }),
  },
};
</script>

<style></style>
