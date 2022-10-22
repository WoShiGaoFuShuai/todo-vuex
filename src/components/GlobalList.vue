<template>
  <div class="global-list">
    <div class="global-list-top">
      <div class="left">
        <h2 class="title">Global list</h2>
        <img class="img" src="@/assets/images/Arrow-right.svg" alt="" />
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
    }
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
</style>
