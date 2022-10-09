<template>
  <div class="settings">
    <div class="top-wrapper">
      <div class="main-text">
        <div class="left">
          <h1>Settings</h1>
          <h2>Categories list overview</h2>
        </div>
        <div class="right">
          <span class="text">Pomodoros</span>
          <span class="decoration">|</span>
          <span class="text">Categories</span>
        </div>
      </div>
    </div>
    <div class="content-categories">
      <!-- <template>
        <div class="item" v-for="(item, i) in settingsCategoryArray" :key="i">
          <span :class="['color', item.css]"></span>
          <input type="text" :value="item.title" />
        </div>

        <div class="buttons">
          <router-link :to="{ name: 'home' }">
            <button class="tasks">Go to Tasks</button>
          </router-link>
          <button class="save">Save</button>
        </div>
      </template> -->
    </div>
    <div class="content-settings">
      <div
        class="item-settings"
        v-for="(item, i) in settingsTimerArray"
        :key="i"
      >
        <div :class="['left', item.color]">
          <span></span>
        </div>
        <div>
          <div class="top">
            <span class="top-name">{{ item.title }}</span>

            <div class="buttons">
              <button class="minus">
                <img src="@/assets/images/Minus.svg" alt="" />
              </button>
              <span class="number">{{ item.number }}</span>
              <button class="plus">
                <img src="@/assets/images/Plus.svg" alt="" />
              </button>
            </div>
          </div>

          <div class="bottom">
            <span class="text">
              Please select a value between {{ item.min }} and {{ item.max }}
              <span class="mins"> minutes </span>
            </span>
          </div>
        </div>
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
      settingsTimerArray: [
        { title: "Work Time", min: 15, max: 25, number: 25, color: "orange" },
        { title: "Long Break", min: 15, max: 30, number: 30, color: "purple" },
        { title: "Short Break", min: 3, max: 5, number: 5, color: "blue" },
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
    // justify-content: center;

    .main-text {
      margin-bottom: 96px;
      display: flex;
      align-items: flex-end;
      width: 100%;
      justify-content: space-between;
      flex-direction: column;

      .left {
        text-align: center;
        align-self: center;

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

      .right {
        .text,
        .decoration {
          font-family: var(--second-font);
          color: var(--grey);
          font-weight: 400;
          margin-left: 8px;
        }
      }
    }
  }

  .content-categories {
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
      .tasks,
      .save {
        background-color: var(--btn-blue);
        padding: 12px 32px;
        border: none;
        outline: none;
        font-family: "PT Sans", sans-serif;
        font-size: 18px;
        font-weight: 700;
        transition: all 0.2s ease;
        margin: 0 12px;
        color: #fff;

        &:hover {
          cursor: pointer;
          background-color: var(--btn-blue-hvr);
        }
      }
      .save {
        background-color: var(--btn-green);

        &:hover {
          background-color: var(--btn-green-hvr);
        }
      }
    }
  }

  .content-settings {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .item-settings {
      display: flex;
      margin-right: 20px;
      margin-bottom: 64px;
      flex-basis: 345px;

      .left {
        padding: 8px;
        border-radius: 50%;
        background-color: var(--orange);
        align-self: baseline;
        margin-right: 16px;
        margin-top: 5px;
      }

      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;

        .top-name {
          font-family: var(--second-font);
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;
          text-transform: uppercase;
        }

        .buttons {
          margin: 0 auto;
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--grey);
          padding-bottom: 8px;

          .minus,
          .plus {
            display: flex;
            transition: all 1s ease;

            img {
              transition: all 0.5s ease-in;
            }

            &:hover {
              cursor: pointer;
              transform: scale(1.5);

              img {
                filter: brightness(0) saturate(100%) invert(80%) sepia(16%)
                  saturate(842%) hue-rotate(155deg) brightness(91%)
                  contrast(93%);
              }
            }
          }

          .number {
            font-weight: 400;
            line-height: 16px;
            padding: 0 20px;
            color: var(--grey);
          }
        }
      }

      .bottom {
        .text,
        .mins {
          font-family: var(--second-font);
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;
          color: var(--grey);
        }

        .mins {
          color: #fff;
        }
      }
    }
  }
}
</style>
