<template>
  <div class="no-daily-task-wrapper">
    <div class="content">
      <h2 class="text">
        <slot></slot>
      </h2>
      <div v-if="typeOfTodos !== 'doneDaily'" class="image">
        <img src="@/assets/images/Arrows-up.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoDailyTasks",
  props: {
    typeOfTodos: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.no-daily-task-wrapper {
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    margin: 32px 0 28px;

    .text {
      font-weight: 300;
      font-size: 30px;
      line-height: 42px;
      margin-bottom: 38px;
      color: var(--greyish);
    }
  }
}
</style>
