<template>
  <div class="deleted-tasks">
    <div class="title-deleted">Deleted Tasks</div>
    <div v-if="!deletedTodos.length" class="no-tasks-to-delete">
      <img class="image" src="@/assets/images/Sad-face.svg" alt="" />
      <h2 class="text">There is nothing to delete...</h2>
    </div>
    <TodoTask :todos="deletedTodos" :typeOfTodos="'deleted'" />
    <ConfirmDelete v-if="isDeleteCompletelyOpen" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TodoTask from "@/components/TodoTasks.vue";
import ConfirmDelete from "@/components/ConfirmDelete.vue";

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
};
</script>

<style lang="scss" scoped>
.deleted-tasks {
  height: 100%;
  position: relative;

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
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);

    .text {
      font-weight: 300;
      font-size: 30px;
      line-height: 42px;
      color: var(--greyish);
    }

    .image {
      filter: invert(69%) sepia(28%) saturate(246%) hue-rotate(164deg)
        brightness(88%) contrast(92%);
      margin-bottom: 20px;
    }
  }
}
</style>
