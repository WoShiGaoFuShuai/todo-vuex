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
  //   ...mapGetters({
  //     isDeleteCompletelyOpen: "modals/isDeleteCompletelyOpen",
  //   }),
  // },
};
</script>

<style lang="scss" scoped></style>
