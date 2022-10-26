<template>
  <div class="content">
    <!-- <ul class="content-nav">
      <li>To Do</li>
      <li class="passive">|</li>
      <li>Done</li>
    </ul> -->
    <div class="content-tasks">
      <div class="content-task" v-for="(todo, i) in todos" :key="i">
        <div :class="['category', todo.category]"></div>
        <div class="deadline">
          <span class="span date">{{ todo.deadline }}</span>
          <!-- <span>{{ checkFunc(todo.deadline) }}</span> -->
        </div>
        <div class="text">
          <p class="text-title">{{ todo.title }}</p>
          <p class="text-description">{{ todo.description }}</p>
        </div>
        <div class="buttons" v-if="typeOfTodos !== 'deleted'">
          <img class="buttons-img" src="@/assets/images/Up.svg" alt="" />
          <img
            @click="openEditModal"
            class="buttons-img"
            src="@/assets/images/Edit.svg"
            alt=""
          />
          <img
            @click="deleteTask(todo.id)"
            class="buttons-img"
            src="@/assets/images/Delete.svg"
            alt=""
          />
        </div>
        <router-link class="link" :to="{ name: 'timer' }">
          <div :class="['priority', todo.priority]">
            <div class="img">
              <span class="estimation">{{ todo.estimation }}</span>
            </div>
          </div>
        </router-link>
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
      required: true,
    },
    typeOfTodos: {
      type: String,
      default: "normal",
    },
  },
  methods: {
    openEditModal() {
      this.$store.dispatch("modals/toggleModals");
      this.$store.dispatch("modals/changeTitleModals", "Edit");
    },
    deleteTask(id) {
      this.$store.dispatch("tasks/deleteTask", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  margin-top: 34px;

  // .content-nav {
  //   display: flex;
  //   justify-content: flex-end;

  //   li {
  //     font-family: "PT Sans", sans-serif;
  //     margin-left: 8px;
  //     color: var(--greyish);
  //     font-size: 16px;
  //     font-weight: 400px;
  //     transition: all 0.5s ease;

  //     &:hover {
  //       cursor: pointer;
  //       color: #fff;
  //       transform: scale(1.1);
  //     }

  //     &:hover.passive {
  //       color: var(--greyish);
  //       cursor: default;
  //       transform: none;
  //     }
  //   }
  // }

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

      .category {
        min-width: 8px;

        @media (max-width: 768px) {
          height: 8px;
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
      }
    }
  }
}
</style>
