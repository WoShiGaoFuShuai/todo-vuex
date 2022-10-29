<template>
  <div class="no-daily-task-wrapper">
    <div class="content">
      <h2 class="text">
        Task added, <br />
        move it to the top 5 in daily task list
      </h2>

      <div class="image">
        <img src="@/assets/images/Arrow-up.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.no-daily-task-wrapper {
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    margin: 80px 0 28px;

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
