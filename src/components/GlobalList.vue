<template>
  <div class="global-list" v-if="todos.length">
    <div class="global-list-top">
      <div @click="toggleGlobalState" class="left">
        <h2 :class="['title', { active }]">Global list</h2>
        <img
          :class="['img', { active }]"
          src="@/assets/images/Arrow-right.svg"
          alt=""
        />
      </div>

      <div :class="['right', { active }]" v-if="active">
        <ul :class="['bars-container', { active }]">
          <li class="bar-item" v-for="(bar, i) in bars" :key="i">
            <span
              @click="sortTodosByPriority(bar, $event)"
              :class="[
                'name',
                { currentActiveBar: bar === currentValueActiveBar },
              ]"
              >{{ bar }}</span
            >
            <span class="decoration">|</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="global-list-content">
      <TodoTasks v-if="active" :todos="todosToShow" />
    </div>
  </div>
</template>

<script>
import TodoTasks from "@/components/TodoTasks.vue";
import { mapGetters } from "vuex";

export default {
  name: "GlobalList",
  components: {
    TodoTasks,
  },
  data() {
    return {
      bars: ["all", "urgent", "high", "middle", "low"],
      todosToShow: [],
      active: false,
      currentActiveBar: true,
      currentValueActiveBar: "all",
    };
  },
  computed: {
    ...mapGetters({
      todos: ["tasks/todos"],
      urgentTodos: ["tasks/urgentTodos"],
      highTodos: ["tasks/highTodos"],
      middleTodos: ["tasks/middleTodos"],
      lowTodos: ["tasks/lowTodos"],
    }),
  },
  methods: {
    sortTodosByPriority(priorityType) {
      if (priorityType === "all") this.todosToShow = this.todos;
      if (priorityType === "urgent") this.todosToShow = this.urgentTodos;
      if (priorityType === "high") this.todosToShow = this.highTodos;
      if (priorityType === "middle") this.todosToShow = this.middleTodos;
      if (priorityType === "low") this.todosToShow = this.lowTodos;
      this.currentValueActiveBar = priorityType;
    },
    toggleGlobalState() {
      this.active = !this.active;
      if (this.active) {
        this.todosToShow = this.todos;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.global-list-top {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 500px) {
    flex-direction: column;
  }

  // &:hover {
  //   cursor: pointer;

  //   // .title {
  //   //   color: var(--grey-light);
  //   // }

  //   .img {
  //     filter: brightness(0) saturate(100%) invert(69%) sepia(82%) saturate(195%)
  //       hue-rotate(153deg) brightness(94%) contrast(86%);
  //   }
  // }

  .left {
    display: flex;
    align-items: center;

    &:hover {
      cursor: pointer;

      .title {
        color: var(--grey-light);
      }

      .img {
        filter: brightness(0) saturate(100%) invert(69%) sepia(82%)
          saturate(195%) hue-rotate(153deg) brightness(94%) contrast(86%);
      }
    }

    .title {
      font-family: var(--second-font);
      color: var(--greyish);
      font-weight: 700;
      font-size: 20px;
      margin-right: 16px;

      &.active {
        color: var(--grey-light);
      }
    }

    .img {
      transition: 0.3s rotate ease-in;
      &.active {
        filter: brightness(0) saturate(100%) invert(69%) sepia(82%)
          saturate(195%) hue-rotate(153deg) brightness(94%) contrast(86%);
        rotate: 90deg;
      }
    }
  }

  .right {
    transition: 1s all ease-in;
    opacity: 0;
    transition: 1s all ease-in;

    &.active {
      transition: 1s all ease-in;
      opacity: 1;
    }

    .bars-container {
      display: flex;

      .bar-item {
        &:last-child > .decoration {
          display: none;
        }

        .name,
        .decoration {
          color: var(--greyish);
          margin-left: 8px;
          font-family: var(--second-font);
          text-transform: capitalize;

          &.currentActiveBar {
            color: #fff;
          }

          &:hover {
            color: #fff;
            cursor: pointer;
          }
        }

        .decoration:hover {
          color: var(--greyish);
        }
      }
    }
  }
}
</style>
