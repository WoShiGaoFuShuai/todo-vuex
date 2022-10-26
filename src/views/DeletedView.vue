<template>
  <div class="deleted-tasks">
    <div class="title-deleted">Deleted Tasks</div>
    <TodoTask :todos="deletedTodos" :typeOfTodos="'deleted'" />
    <ConfirmDelete v-if="false" />
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
    ...mapGetters({ deletedTodos: "tasks/deletedTodos" }),
  },
};
</script>

<style lang="scss" scoped>
.deleted-tasks {
  .title-deleted {
    margin-top: 16px;
    cursor: pointer;
    letter-spacing: 0.7px;
    font-size: 28px;
    margin-right: 16px;
    text-align: center;
  }
}
</style>
