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

      <div :class="['right', { active }]">
        <ul :class="['bars-container', { active }]">
          <li class="bar-item" v-for="(bar, i) in bars" :key="i">
            <span
              @click="sortTodosByPriority(bar)"
              :class="['name', { currentActiveBar: bar === currentActiveBar }]"
              >{{ bar }}</span
            >
            <span class="decoration">|</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="global-list-content">
      <TodoTasks v-if="active" :todos="todosToShow" :typeOfTodos="'global'" />
      <NoGlobalTasks
        v-if="!todosToShow.length && active"
        :barName="currentActiveBar"
      />
    </div>
  </div>
</template>

<script>
import TodoTasks from "@/components/TodoTasks.vue";
import NoGlobalTasks from "@/components/global/NoGlobalTasks.vue";
import { mapGetters } from "vuex";

export default {
  name: "GlobalList",
  components: {
    TodoTasks,
    NoGlobalTasks,
  },
  data() {
    return {
      bars: ["all", "urgent", "high", "middle", "low"],
      todosToShow: [],
      active: false,
      currentActiveBar: "all",
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
    toggleGlobalState() {
      this.active = !this.active;

      if (this.active) {
        this.currentActiveBar = "all";
        this.todosToShow = this.todos;
      }
    },
    sortTodosByPriority(priorityType) {
      switch (priorityType) {
        case "all":
          this.todosToShow = this.todos;
          break;

        default:
          this.todosToShow = this.todos.filter(
            (todo) => todo.priority === priorityType
          );
      }
      this.currentActiveBar = priorityType;
    },
  },
  beforeMount() {
    this.todosToShow = this.todos;
    this.active = true;
  },
  watch: {
    todos(newValue) {
      this.sortTodosByPriority(this.currentActiveBar);
      if (!newValue.length) {
        this.currentActiveBar = "all";
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
    transition: 0.3s all ease-in;
    opacity: 0;
    pointer-events: none;

    &.active {
      opacity: 1;
      pointer-events: auto;
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
