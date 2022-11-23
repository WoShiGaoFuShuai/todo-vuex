<template>
  <div class="home">
    <DailyTask />
    <TopDailyTasks />
    <GlobalList />
  </div>
</template>

<script>
import DailyTask from "@/components/daily/DailyTask.vue";
import TopDailyTasks from "@/components/daily/TopDailyTasks.vue";
import GlobalList from "@/components/global/GlobalList.vue";
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: {
    DailyTask,
    GlobalList,
    TopDailyTasks,
  },
  data() {
    return {};
  },
  beforeMount() {
    if (this.$store.state.tasks.todos.length) {
      this.$store.dispatch("tasks/checkDeadline", "global");
      this.$store.dispatch("tasks/sortTasks", "global");
    }
    if (this.$store.state.tasks.dailyTodos.length) {
      this.$store.dispatch("tasks/checkDeadline", "daily");
      this.$store.dispatch("tasks/sortTasks", "daily");
    }

    if (this.$store.state.tasks.dailyDoneTodos.length) {
      this.$store.dispatch("tasks/checkDeadline", "doneDaily");
      this.$store.dispatch("tasks/sortTasks", "doneDaily");
    }
  },
  computed: {
    ...mapGetters({
      todayInStore: "tasks/todayInStore",
    }),
  },
};
</script>

<style lang="scss" scoped></style>
