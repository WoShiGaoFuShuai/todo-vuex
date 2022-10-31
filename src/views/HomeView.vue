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
// import { mapGetters } from "vuex";

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
  // computed: {
  // ...mapGetters({
  // todos: "tasks/todos",
  // }),
  // },
};
</script>

<style lang="scss" scoped></style>
