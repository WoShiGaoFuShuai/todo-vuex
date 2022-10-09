<template>
  <div class="global-list">
    <div class="global-list-top">
      <div class="left">
        <h2>Global list</h2>
        <img src="@/assets/images/Arrow-right.svg" alt="" />
      </div>

      <div class="right">
        <ul class="bars-container">
          <li class="bar-item" v-for="(bar, i) in bars" :key="i">
            <span class="name">{{ bar }}</span>
            <span class="decoration">|</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="global-list-content">
      <TodoTasks />
    </div>
  </div>
</template>

<script>
import TodoTasks from "@/components/TodoTasks.vue";

export default {
  name: "GlobalList",
  components: {
    TodoTasks,
  },
  todos: {
    type: Object,
    required: true,
  },
  data() {
    return {
      bars: ["All", "Urgent", "High", "Middle", "Low"],
    };
  },
};
</script>

<style lang="scss" scoped>
.global-list-top {
  display: flex;
  // align-items: center;
  justify-content: space-between;

  &:hover {
    cursor: pointer;

    h2 {
      color: var(--grey-light);
    }

    img {
      filter: brightness(0) saturate(100%) invert(69%) sepia(82%) saturate(195%)
        hue-rotate(153deg) brightness(94%) contrast(86%);
    }
  }

  .left {
    display: flex;
    align-items: center;

    h2 {
      font-family: "PT Sans", sans-serif;
      color: var(--grey);
      font-weight: 700;
      font-size: 20px;
      margin-right: 16px;
    }
  }

  .bars-container {
    display: flex;

    // &:last-child li .decoration {
    //   background: white;
    // }

    .bar-item {
      &:last-child > .decoration {
        display: none;
      }
      .name,
      .decoration {
        color: var(--grey);
        margin-left: 8px;
        font-family: var(--second-font);

        &:hover {
          color: #fff;
        }
      }

      .decoration:hover {
        color: var(--grey);
      }
    }
  }
}
</style>
