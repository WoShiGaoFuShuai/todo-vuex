<template>
  <div class="home">
    <DailyTask />
    <AppFirstTask />
    <TodoTasks />
    <GlobalList />
  </div>
</template>

<script>
import DailyTask from "@/components/DailyTask.vue";
import AppFirstTask from "@/components/FirstTask.vue";
import TodoTasks from "@/components/TodoTasks.vue";
import GlobalList from "@/components/GlobalList.vue";

export default {
  name: "HomeView",
  components: { AppFirstTask, DailyTask, TodoTasks, GlobalList },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
