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
    this.$store.dispatch("tasks/setTodayDate");

    if (this.$store.state.tasks.todos.length) {
      this.$store.dispatch("tasks/checkDeadline", "global");
      this.$store.dispatch("tasks/sortTasks", "global");
    }
    if (this.$store.state.tasks.dailyTodos.length) {
      this.$store.dispatch("tasks/checkDeadline", "daily");
      this.$store.dispatch("tasks/sortTasks", "daily");
    }
  },
};
</script>

<style></style>
