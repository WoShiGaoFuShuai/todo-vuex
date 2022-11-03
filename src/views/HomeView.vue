<template>
  <div class="home">
    <DailyTask />
    <TopDailyTasks />
    <GlobalList />
    <NotificationMsg v-if="isShowNotification" />
  </div>
</template>

<script>
import DailyTask from "@/components/daily/DailyTask.vue";
import TopDailyTasks from "@/components/daily/TopDailyTasks.vue";
import NotificationMsg from "@/components/modals/NotificationMsg.vue";
import GlobalList from "@/components/global/GlobalList.vue";
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: {
    DailyTask,
    GlobalList,
    TopDailyTasks,
    NotificationMsg,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      isShowNotification: "modals/isShowNotification",
    }),
  },
};
</script>

<style lang="scss" scoped></style>
