<template>
  <div class="home"></div>
</template>

<script>
// import getCollection from "@/composables/getCollection";
// import { onMounted } from "vue";

export default {
  name: "HomeView",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.home {
  .router-link-exact-active {
    img {
      filter: brightness(0) saturate(100%) invert(100%) sepia(5%) saturate(1%)
        hue-rotate(37deg) brightness(105%) contrast(100%);
    }
  }

  .nav-ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    li {
      margin-left: 32px;

      img {
        transition: all 0.2s ease-in;
      }

      &:hover {
        img {
          cursor: pointer;
          transform: scale(1.05);
          filter: brightness(0) saturate(100%) invert(100%) sepia(5%)
            saturate(1%) hue-rotate(37deg) brightness(105%) contrast(100%);
        }
      }
    }

    .nav-username {
      margin-left: 0;
      margin-right: auto;
      color: var(--grey);
    }

    .link,
    .btn {
      background-color: var(--grey);
      padding: 8px 10px;
      border-radius: 10px 0px 10px 0px;
      transition: all 0.3s ease;

      &:hover {
        cursor: pointer;
        background-color: var(--grey-light);
        border-radius: 0px 10px 0px 10px;
      }
    }

    .btn {
      padding: 5px 8px;
    }
  }

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

  .global-list {
    display: inline-flex;
    align-items: center;

    &:hover {
      cursor: pointer;

      h2 {
        color: var(--grey-light);
      }

      img {
        filter: brightness(0) saturate(100%) invert(69%) sepia(82%)
          saturate(195%) hue-rotate(153deg) brightness(94%) contrast(86%);
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
}
</style>
