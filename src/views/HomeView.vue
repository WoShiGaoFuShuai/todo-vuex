<template>
  <div class="home">
    <DailyTask />
    <TopDailyTasks v-if="dailyDoneTodos.length || dailyTodos.length" />
    <!-- <NoTasks /> -->
    <GlobalList />
  </div>
</template>

<script>
import DailyTask from "@/components/daily/DailyTask.vue";
import TopDailyTasks from "@/components/daily/TopDailyTasks.vue";
// import NoTasks from "@/components/daily/NoTasks.vue";
import GlobalList from "@/components/global/GlobalList.vue";
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: {
    // NoTasks,
    DailyTask,
    GlobalList,
    TopDailyTasks,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      dailyDoneTodos: "tasks/dailyDoneTodos",
      dailyTodos: "tasks/dailyTodos",
    }),
  },
};
</script>

<style lang="scss" scoped></style>
