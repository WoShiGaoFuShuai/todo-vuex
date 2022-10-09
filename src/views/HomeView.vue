<template>
  <div class="home">
    <AddTaskModal />
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
import AddTaskModal from "@/components/AddTaskModal.vue";

export default {
  name: "HomeView",
  components: {
    AppFirstTask,
    DailyTask,
    GlobalList,
    TopDailyTasks,
    AddTaskModal,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
