<template>
  <div class="main-title">
    <h1>Daily Task List</h1>
    <img src="@/assets/images/Add.svg" alt="" @click="openAddTask" />
  </div>
</template>

<script>
export default {
  name: "DailyTask",
};
</script>

<style lang="scss" scoped>
.main-title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;

  h1 {
    cursor: pointer;
    letter-spacing: 0.7px;
    font-size: 28px;
    margin-right: 16px;
  }

  img {
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    &:hover {
      transform: scale(1.3) rotate(90deg);
    }
  }
}
</style>
