<template>
  <div class="settings">
    <div class="top-wrapper">
      <div class="main-text">
        <h1>Settings</h1>
        <h2>Categories list overview</h2>
      </div>
    </div>
    <div class="content">
      <div class="item" v-for="(item, i) in settingsCategoryArray" :key="i">
        <span :class="['color', item.css]"></span>
        <input type="text" :value="item.title" />
      </div>

      <div class="buttons">
        <router-link :to="{ name: 'home' }">
          <button class="blue">Go to Tasks</button>
        </router-link>
        <button class="green">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingsView",
  data() {
    return {
      settingsCategoryArray: [
        {
          title: "Work",
          css: "work",
        },
        {
          title: "Education",
          css: "education",
        },
        {
          title: "Hobby",
          css: "hobby",
        },
        {
          title: "Sport",
          css: "sport",
        },
        {
          title: "Other",
          css: "other",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.settings {
  margin-top: 18px;

  .top-wrapper {
    display: flex;
    justify-content: center;

    .main-text {
      text-align: center;
      margin-bottom: 96px;

      h1 {
        margin-bottom: 20px;
        font-size: 28px;
        line-height: 32px;
        letter-spacing: 0.7px;
      }

      h2 {
        font-weight: 300;
        font-size: 22px;
        line-height: 28px;
        letter-spacing: 0.55px;
        color: var(--grey);
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;

    .item {
      max-width: 288px;
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 32px;

      &:nth-last-child(2) {
        margin-bottom: 80px;
      }

      .color {
        width: 16px;
        height: 16px;
        display: inline-block;
        background-color: red;
        margin-right: 20px;
        border-radius: 50%;
      }

      input {
        color: var(--grey);
        font-weight: 400;
        font-size: 16px;
        padding: 8px 0;
        width: 85%;
        background: none;
        outline: none;
        border: none;
        border-bottom: 1px solid #425869;
      }
    }

    .buttons {
      .blue,
      .green {
        background-color: var(--btn-blue);
        padding: 12px 32px;
        border: none;
        outline: none;
        font-family: "PT Sans", sans-serif;
        font-size: 18px;
        font-weight: 700;
        transition: all 0.2s ease;
        margin: 0 12px;

        &:hover {
          cursor: pointer;
          background-color: var(--btn-blue-hvr);
        }
      }
      .green {
        background-color: var(--btn-green);

        &:hover {
          background-color: var(--btn-green-hvr);
        }
      }
    }
  }
}
</style>
