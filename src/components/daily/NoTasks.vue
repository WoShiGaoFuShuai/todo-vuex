<template>
  <div class="first-task-wrapper">
    <div>
      <img class="img" src="@/assets/images/First-task.svg" alt="" />
    </div>
    <h2 class="no-task-title">Add your first task</h2>
  </div>
</template>

<script>
export default {
  name: "NoTask",
};
</script>

<style lang="scss" scoped>
.first-task-wrapper {
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  margin-top: 40px;
  text-align: center;

  .img {
    margin-bottom: 64px;
  }

  .no-task-title {
    color: #8da5b8;
    font-weight: 300;
    font-size: 30px;
    line-height: 42px;
  }
}
</style>
