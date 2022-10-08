<template>
  <div class="first-task-wrapper">
    <div>
      <img src="@/assets/images/First-task.svg" alt="" />
    </div>
    <h2>Add your first task</h2>
  </div>
</template>

<script>
export default {
  name: "AppFirstTask",
};
</script>

<style lang="scss" scoped>
.first-task-wrapper {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  img {
    margin-bottom: 64px;
  }

  h2 {
    color: #8da5b8;
    font-weight: 300;
    font-size: 30px;
    line-height: 42px;
  }
}
</style>
