<template>
  <div
    v-if="todos.length || dailyTodos.length || dailyDoneTodos.length"
    class="content"
  >
    <!-- <ConfirmDeleteDoneTasks v-if="isDeleteDoneTasksModal" /> -->
    <ul class="content-nav">
      <li
        @click="changeTodoToShow('dailyTodos')"
        :class="['li', { active: typeOfTodos === 'daily' }]"
      >
        To Do
      </li>
      <li class="li passive">|</li>
      <li
        @click="changeTodoToShow('dailyDoneTodos')"
        :class="['li', { active: typeOfTodos === 'doneDaily' }]"
      >
        Done
      </li>
    </ul>
    <div
      class="delete-wrapper"
      v-if="typeOfTodos === 'doneDaily' && dailyDoneTodos.length"
    >
      <span @click="deleteAllDoneTasks" class="delete-all"
        >Delete all done tasks</span
      >
    </div>
    <TodoTasks :todos="todoToShow" :typeOfTodos="typeOfTodos" />
    <div
      :class="['no-daily-tasks', { 'not-active': typeOfTodos === 'doneDaily' }]"
    >
      <NoDailyTasks
        v-if="!dailyTodos.length"
        :class="{ 'not-active': typeOfTodos === 'doneDaily' }"
      >
        {{ textTodo.line1 }} <br />
        {{ textTodo.line2 }}
      </NoDailyTasks>
      <!-- v-if="todos.length && !dailyDoneTodos.length" -->
      <NoDailyTasks
        v-if="!dailyDoneTodos.length"
        :typeOfTodos="typeOfTodos"
        :class="{ 'not-active': typeOfTodos === 'daily' }"
      >
        {{ textDone.line1 }} <br />
        {{ textDone.line2 }}
      </NoDailyTasks>
    </div>
  </div>
</template>

<script>
import TodoTasks from "@/components/TodoTasks.vue";
import NoDailyTasks from "@/components/daily/NoDailyTasks.vue";
// import ConfirmDeleteDoneTasks from "@/components/modals/ConfirmDeleteDoneTasks.vue";

import { mapGetters } from "vuex";

export default {
  name: "DailyTasks",
  components: { TodoTasks, NoDailyTasks },

  computed: {
    ...mapGetters({
      dailyTodos: "tasks/dailyTodos",
      dailyDoneTodos: "tasks/dailyDoneTodos",
      todos: "tasks/todos",
      // isDeleteDoneTasksModal: "modals/isDeleteDoneTasksModal",
    }),
  },
  data() {
    return {
      todoToShow: null,
      typeOfTodos: null,
      textTodo: {
        line1: "No tasks to do,",
        line2: "move tasks to the top 5 in daily task list.",
      },
      textDone: {
        line1: "No finished tasks,",
        line2: "done a task and return here, please.",
      },
    };
  },
  beforeMount() {
    this.todoToShow = this.dailyTodos;
    this.typeOfTodos = "daily";
  },
  methods: {
    changeTodoToShow(todosToShow) {
      if (todosToShow === "dailyDoneTodos") {
        this.todoToShow = this.dailyDoneTodos;
        this.typeOfTodos = "doneDaily";
      } else {
        this.todoToShow = this.dailyTodos;
        this.typeOfTodos = "daily";
      }
    },
    deleteAllDoneTasks() {
      this.$store.dispatch("tasks/deleteAllDoneTasks");
      // this.$store.dispatch("modals/toggleDeleteDoneTasksModal");
      this.todoToShow = this.dailyDoneTodos;
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  margin-top: 34px;

  .content-nav {
    display: flex;
    justify-content: flex-end;

    .li {
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

      &:hover.passive {
        color: var(--greyish);
        cursor: default;
      }

      &.active {
        color: #fff;
      }
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

  .no-daily-tasks {
    .not-active {
      display: none;
    }
  }

  .content-tasks {
    .no-tasks {
      text-align: center;
      margin-bottom: 28px;

      .title {
        font-size: 30px;
        font-weight: 300;
        line-height: 42px;
        color: var(--greyish);
        margin-bottom: 36px;
      }
    }
    .content-task {
      margin-top: 16px;
      display: flex;
      background-color: #fff;
      transition: all 0.4s ease;

      &:last-child {
        margin-bottom: 32px;
      }

      &:hover {
        transform: scale(1.006);
      }

      .category {
        min-width: 8px;
        background-color: var(--redish);
      }

      .deadline {
        align-self: center;

        .deadline-span {
          color: var(--expired);
          font-weight: 700;
          font-size: 11px;
          margin: 0 16px;
          text-transform: uppercase;

          &.date {
            color: red;
          }
        }
      }

      .text {
        flex-grow: 1;
        padding: 14px 0;
        align-self: center;

        .text-title {
          font-size: 18px;
          color: #e74c3c;
          margin-bottom: 4px;
        }

        .text-description {
          font-size: 16px;
          color: #7f7f7f;
          font-weight: 400;
        }
      }

      .buttons {
        align-self: center;
        margin-right: 20px;
        min-width: 80px;

        img {
          margin-left: 20px;
          filter: brightness(0) saturate(100%) invert(95%) sepia(0%)
            saturate(107%) hue-rotate(161deg) brightness(86%) contrast(92%);
          transition: all 0.4s ease;

          &:hover {
            cursor: pointer;
            transform: scale(1.1);
            filter: brightness(0) saturate(100%) invert(67%) sepia(25%)
              saturate(288%) hue-rotate(164deg) brightness(93%) contrast(87%);
          }
        }
      }

      .priority {
        background-color: red;
        display: flex;
        justify-content: center;
        align-items: center;

        .img {
          position: relative;

          img {
            margin: 20px;

            &:hover + span {
              display: none;
            }
          }

          estimation-span {
            font-family: "PT Sans", sans-serif;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            font-size: 24px;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>
