<template>
  <div class="daily-task-wrapper">
    <div class="main-title">
      <h1 class="title-daily">Daily Task List</h1>
      <img
        @click="openModalAdd"
        class="img"
        src="@/assets/images/Add.svg"
        alt=""
      />
      <AddTaskModal v-if="isOpen" />
    </div>
    <NoTasks v-if="!todos.length && !dailyTodos.length" />
    <NoDailyTasks v-if="todos.length && !dailyTodos.length" />
  </div>
</template>

<script>
import AddTaskModal from "@/components/modals/AddTaskModal.vue";
import NoTasks from "@/components/daily/NoTasks.vue";
import NoDailyTasks from "@/components/daily/NoDailyTasks.vue";
import { mapGetters } from "vuex";

export default {
  name: "DailyTask",
  components: {
    AddTaskModal,
    NoTasks,
    NoDailyTasks,
  },
  methods: {
    openModalAdd() {
      this.$store.dispatch("modals/toggleModals");
      this.$store.dispatch("modals/changeTitleModals", "Add");
    },
  },
  computed: {
    ...mapGetters({
      isOpen: "modals/isOpen",
      todos: "tasks/todos",
      dailyTodos: "tasks/dailyTodos",
    }),
  },
};
</script>

<style lang="scss" scoped>
.main-title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;

  .title-daily {
    cursor: pointer;
    letter-spacing: 0.7px;
    font-size: 28px;
    margin-right: 16px;
  }

  .img {
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    &:hover {
      transform: scale(1.3) rotate(90deg);
    }
  }
}
</style>
