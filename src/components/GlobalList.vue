<template>
  <div class="global-list">
    <h2>Global list</h2>
    <img src="@/assets/images/Arrow-right.svg" alt="" />

    <ul>
      <li v-for="(bar, i) in bars" :key="i">
        <span class="name">bar</span>
        <span class="decoration">|</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GlobalList",
  data() {
    return {
      bars: ["All", "Urgent", "High", "Middle", "Low"],
    };
  },
};
</script>

<style lang="scss" scoped>
.global-list {
  display: inline-flex;
  align-items: center;

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

  h2 {
    font-family: "PT Sans", sans-serif;
    color: var(--grey);
    font-weight: 700;
    font-size: 20px;
    margin-right: 16px;
  }
}
</style>
