<template>
  <h2 class="no-tasks-priority">No tasks with priority: '{{ barName }}.'</h2>
</template>

<script>
export default {
  name: "NoGlobalTasks",
  props: {
    barName: {
      type: String,
      default: "all",
    },
  },
};
</script>

<style lang="scss" scoped>
.no-tasks-priority {
  color: var(--greyish);
  font-weight: 300;
  font-size: 30px;
  text-align: center;
}
</style>
