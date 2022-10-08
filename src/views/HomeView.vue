<template>
  <div class="home">
    <DailyTask />
    <TopDailyTasks />
    <AppFirstTask />
    <GlobalList />
  </div>
</template>

<script>
import DailyTask from "@/components/DailyTask.vue";
import TopDailyTasks from "@/components/TopDailyTasks.vue";
import AppFirstTask from "@/components/FirstTask.vue";
import GlobalList from "@/components/GlobalList.vue";

export default {
  name: "HomeView",
  components: { AppFirstTask, DailyTask, GlobalList, TopDailyTasks },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
