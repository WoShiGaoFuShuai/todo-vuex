<template>
  <div class="content">
    <!-- <ul class="content-nav">
      <li>To Do</li>
      <li class="passive">|</li>
      <li>Done</li>
    </ul> -->
    <div class="content-tasks">
      <div
        :class="['content-task', { done: typeOfTodos === 'doneDaily' }]"
        v-for="(todo, i) in todos"
        :key="i"
      >
        <div
          @click="deleteTaskCompletely(todo.id)"
          :class="[
            'category',
            todo.category,
            { 'category-deleted': typeOfTodos === 'deleted' },
          ]"
        ></div>
        <div class="deadline" v-if="typeOfTodos !== 'deleted'">
          <span
            :class="['span', 'date', { done: typeOfTodos === 'doneDaily' }]"
            >{{ todo.deadline }}</span
          >
          <!-- <span>{{ checkFunc(todo.deadline) }}</span> -->
        </div>
        <div :class="['text', { 'text-deleted': typeOfTodos === 'deleted' }]">
          <p :class="['text-title', { done: typeOfTodos === 'doneDaily' }]">
            {{ todo.title }}
          </p>
          <p class="text-description">{{ todo.description }}</p>
        </div>
        <div class="buttons" v-if="typeOfTodos !== 'deleted'">
          <img
            v-if="typeOfTodos === 'daily'"
            @click="doneTask(todo.id)"
            class="buttons-img"
            src="@/assets/images/Done.svg"
            alt=""
          />
          <img
            v-if="typeOfTodos === 'timerTodo'"
            @click="doneTask(todo.id)"
            class="buttons-img"
            src="@/assets/images/Done.svg"
            alt=""
          />
          <img
            v-if="typeOfTodos === 'global'"
            @click="pushToDailyTodos(todo.id)"
            class="buttons-img"
            src="@/assets/images/Up.svg"
            alt=""
          />
          <img
            v-if="typeOfTodos !== 'doneDaily'"
            @click="openEditModal(todo.id)"
            :class="[
              'buttons-img',
              { 'timer-edit': typeOfTodos === 'timerTodo' },
            ]"
            src="@/assets/images/Edit.svg"
            alt=""
          />
          <img
            @click="deleteTask(todo.id)"
            :class="['buttons-img', { done: typeOfTodos === 'doneDaily' }]"
            src="@/assets/images/Delete.svg"
            alt=""
          />
        </div>
        <router-link
          v-if="typeOfTodos !== 'doneDaily'"
          class="link"
          :to="{ name: 'timer' }"
        >
          <div
            @click="goToTimer(todo.id)"
            :class="[
              'priority',
              todo.priority,
              { timer: typeOfTodos === 'timerTodo' },
            ]"
          >
            <div class="img">
              <span class="estimation">{{ todo.estimation }}</span>
            </div>
          </div>
        </router-link>
        <div
          v-if="typeOfTodos === 'doneDaily'"
          :class="[
            'priority',
            todo.priority,
            {
              done: typeOfTodos === 'doneDaily',
              timer: typeOfTodos === 'timerTodo',
            },
          ]"
        >
          <div class="img">
            <span class="estimation">{{ todo.estimation }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoTasks",
  data() {
    return {};
  },

  props: {
    todos: {
      type: Array,
    },
    typeOfTodos: {
      type: String,
      default: "default",
    },
  },
  methods: {
    openEditModal(id) {
      this.$store.dispatch("modals/toggleModals");
      this.$store.dispatch("modals/changeTitleModals", "Edit");

      if (this.typeOfTodos === "global") {
        this.$store.dispatch("tasks/editTaskGlobal", id);
      } else {
        this.$store.dispatch("tasks/editTaskDaily", id);
      }
    },
    deleteTask(id) {
      switch (this.typeOfTodos) {
        case "global":
          this.$store.dispatch("tasks/deleteTask", id);
          break;
        case "doneDaily":
          this.$store.dispatch("tasks/deleteDoneDailyTask", id);
          break;
        case "daily":
          this.$store.dispatch("tasks/deleteDailyTask", id);
          break;
        case "timerTodo":
          this.$store.dispatch("tasks/deleteDailyOrGlobalTask", id);
          break;
      }
    },
    deleteTaskCompletely(id) {
      if (this.typeOfTodos === "deleted") {
        this.$store.dispatch("tasks/changeDeleteCompletelyTaskId", id);
        this.$store.dispatch("modals/toggleDeleteCompletelyModal");
      }
    },
    pushToDailyTodos(id) {
      this.$store.dispatch("tasks/pushToDailyTodos", id);
    },
    doneTask(id) {
      if (this.typeOfTodos === "daily") {
        this.$store.dispatch("tasks/doneTask", { id, type: this.typeOfTodos });
      } else {
        this.$store.dispatch("tasks/deleteTimerTodo");
        this.$store.dispatch("tasks/doneTask", { id, type: this.typeOfTodos });
      }
    },
    goToTimer(id) {
      if (this.typeOfTodos === "global") {
        this.$store.dispatch("tasks/goToTimer", { id, type: "global" });
      } else {
        this.$store.dispatch("tasks/goToTimer", { id, type: "daily" });
      }
    },
  },
  beforeMount() {
    console.log("aaaaaa");
  },
};
</script>

<style lang="scss" scoped>
.content {
  margin-top: 34px;

  .content-tasks {
    .content-task {
      margin-top: 16px;
      display: flex;
      background-color: #fff;
      transition: all 0.4s ease;

      @media (max-width: 768px) {
        flex-direction: column;
      }

      &:last-child {
        margin-bottom: 32px;
      }

      &:hover {
        transform: scale(1.006);
      }

      &.done {
        background-color: #d4d9dc;
      }

      .category {
        min-width: 8px;

        @media (max-width: 768px) {
          height: 8px;
        }

        &.category-deleted {
          min-width: 88px;
          background-image: url("@/assets/images/Delete-bg.svg");
          background-position: center;
          cursor: pointer;

          &:hover {
            background-image: url("@/assets/images/Delete-bg-active.svg");
          }

          @media (max-width: 768px) {
            height: 64px;
          }
        }
      }

      .deadline {
        align-self: center;

        @media (max-width: 768px) {
          align-self: flex-start;
        }

        .span {
          color: #9f9f9f;
          font-weight: 700;
          font-size: 11px;
          margin: 0 16px;
          text-transform: uppercase;

          &.date {
            color: red;

            &.done {
              color: #9f9f9f;
            }
          }
        }
      }

      .text {
        flex-grow: 1;
        padding: 14px 0;
        align-self: center;
        overflow-wrap: break-word;

        @media (max-width: 768px) {
          padding: 8px 0;
          align-self: flex-start;
          margin: 0 16px;
          line-height: 22px;
        }

        &.text-deleted {
          margin-left: 16px;
        }

        .text-title {
          font-size: 18px;
          color: #e74c3c;
          margin-bottom: 4px;
          overflow-wrap: break-word;
          word-break: break-all;

          @media (max-width: 425px) {
            font-size: 16px;
            line-height: 18px;
          }

          &.done {
            text-decoration: line-through;
          }
        }

        .text-description {
          font-size: 16px;
          color: #7f7f7f;
          font-weight: 400;
          margin-bottom: 0;
          overflow-wrap: break-word;
          word-break: break-all;

          @media (max-width: 425px) {
            font-size: 14px;
          }
        }
      }

      .buttons {
        align-self: center;
        margin-right: 15px;
        min-width: 80px;

        @media (max-width: 768px) {
          margin-right: 16px;
          margin-bottom: 8px;
          align-self: flex-end;
        }

        .buttons-img {
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

          &.done {
            filter: brightness(0) saturate(100%) invert(100%) sepia(2%)
              saturate(0%) hue-rotate(167deg) brightness(104%) contrast(103%);

            &:hover {
              cursor: pointer;
              transform: scale(1.1);
              filter: brightness(0) saturate(100%) invert(67%) sepia(25%)
                saturate(288%) hue-rotate(164deg) brightness(93%) contrast(87%);
            }
          }

          &.timer-edit {
            display: none;
            pointer-events: none;
          }
        }
      }

      .priority {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;

        @media (max-width: 768px) {
          height: 64px;
        }

        .img {
          position: relative;
          width: 88px;
          background: url("@/assets/images/Apple.svg") no-repeat center;
          height: 100%;

          &:hover {
            cursor: pointer;
            margin-top: 10px;
            background: url("@/assets/images/Hover.svg") no-repeat center;
            filter: brightness(0) saturate(100%) invert(100%) sepia(0%)
              saturate(7500%) hue-rotate(298deg) brightness(105%) contrast(103%);

            .estimation {
              display: none;
            }
          }

          .estimation {
            font-family: "PT Sans", sans-serif;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            font-size: 24px;
            font-weight: 700;
            margin-top: 3px;
          }
        }

        &.done {
          height: inherit;

          .img {
            pointer-events: none;
          }
        }

        &.timer {
          pointer-events: none;
        }
      }
    }
  }
}
</style>
