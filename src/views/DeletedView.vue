<template>
  <div class="deleted-tasks">
    <div class="title-deleted">Deleted Tasks</div>
    <div v-if="!deletedTodos.length" class="no-tasks-to-delete">
      <img class="image" src="@/assets/images/Sad-face.svg" alt="" />
      <h2 class="text">There is nothing to delete...</h2>
    </div>
    <div class="delete-wrapper" v-if="deletedTodos.length">
      <span @click="deleteAllDeletedTasks" class="delete-all"
        >Delete all deleted tasks</span
      >
    </div>
    <TodoTask :todos="deletedTodos" :typeOfTodos="'deleted'" />
    <ConfirmDelete v-if="isDeleteCompletelyOpen" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TodoTask from "@/components/TodoTasks.vue";
import ConfirmDelete from "@/components/modals/ConfirmDelete.vue";

export default {
  name: "DeletedView",
  components: {
    TodoTask,
    ConfirmDelete,
  },
  computed: {
    ...mapGetters({
      deletedTodos: "tasks/deletedTodos",
      isDeleteCompletelyOpen: "modals/isDeleteCompletelyOpen",
    }),
  },
  methods: {
    deleteAllDeletedTasks() {
      this.$store.dispatch("tasks/toggleDeleteAllDeletedTasks");
      this.$store.dispatch("modals/toggleDeleteCompletelyModal");
    },
  },
};
</script>

<style lang="scss" scoped>
.deleted-tasks {
  height: 100%;

  .title-deleted {
    margin-top: 16px;
    letter-spacing: 0.7px;
    font-size: 28px;
    margin-right: 16px;
    text-align: center;
  }

  .no-tasks-to-delete {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 80px;

    .text {
      font-weight: 300;
      font-size: 30px;
      line-height: 42px;
      color: var(--greyish);
      text-align: center;
    }

    .image {
      filter: invert(69%) sepia(28%) saturate(246%) hue-rotate(164deg)
        brightness(88%) contrast(92%);
      margin-bottom: 20px;
    }
  }

  .delete-wrapper {
    .delete-all {
      font-family: "PT Sans", sans-serif;
      margin-left: 8px;
      color: var(--greyish);
      font-size: 16px;
      font-weight: 400px;
      transition: all 0.5s ease;

      &:hover {
        cursor: pointer;
        color: #fff;
      }
    }
  }
}
</style>
