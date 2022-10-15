<template>
  <div class="settings">
    <div class="top-wrapper">
      <div class="main-text">
        <div class="left">
          <h1 class="left-title">Settings</h1>
          <h2 class="left-subtitle">Categories list overview</h2>
        </div>
        <div class="right">
          <span
            @click="changeSettingsView(true, false)"
            :class="['text', { active: openPomodoro }]"
            >Pomodoro</span
          >
          <span class="decoration">|</span>
          <span
            @click="changeSettingsView(false, true)"
            :class="['text', { active: openCategories }]"
            >Categories</span
          >
        </div>
      </div>
    </div>
    <div v-if="openCategories" class="content-categories">
      <div class="item" v-for="(item, i) in settingsCategoryArray" :key="i">
        <span :class="['color', item.css]"></span>
        <input class="category-input" type="text" v-model="item.title" />
      </div>

      <div class="buttons">
        <router-link :to="{ name: 'home' }">
          <button class="tasks">Go to Tasks</button>
        </router-link>
        <button class="save">Save</button>
      </div>
    </div>
    <div v-if="openPomodoro" class="content-settings">
      <div>
        <div
          class="item-settings"
          v-for="({ title, min, max, number, color }, i) in settingsTimerArray"
          :key="i"
        >
          <div :class="['left', color]">
            <span></span>
          </div>
          <div class="right">
            <div class="top">
              <span class="top-name">{{ title }}</span>

              <div class="buttons">
                <button class="minus">
                  <img src="@/assets/images/Minus.svg" alt="" />
                </button>
                <span class="number">{{ number }}</span>
                <button class="plus">
                  <img src="@/assets/images/Plus.svg" alt="" />
                </button>
              </div>
            </div>

            <div class="bottom">
              <span class="text">
                Please select a value between {{ min }} and {{ max }}
                <span class="mins"> minutes </span>
              </span>
            </div>
          </div>
        </div>

        <div class="buttons">
          <router-link :to="{ name: 'home' }">
            <button class="tasks">Go to Tasks</button>
          </router-link>
          <button class="save">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const DEFAULT_CATEGORY = [
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
];

export default {
  name: "SettingsView",
  data() {
    return {
      settingsCategoryArray: DEFAULT_CATEGORY,
      settingsTimerArray: [
        { title: "Work Time", min: 15, max: 25, number: 25, color: "orange" },
        { title: "Long Break", min: 15, max: 30, number: 30, color: "purple" },
        { title: "Short Break", min: 3, max: 5, number: 5, color: "blue" },
      ],
      openPomodoro: true,
      openCategories: false,
    };
  },
  methods: {
    changeSettingsView(firstArg, secondArg) {
      this.openPomodoro = firstArg;
      this.openCategories = secondArg;
    },
  },
};
</script>

<style lang="scss" scoped>
.settings {
  margin-top: 18px;

  .top-wrapper {
    display: flex;
    // justify-content: center;

    @media (max-width: 768px) {
      margin-bottom: -30px;
    }

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

        .left-title {
          margin-bottom: 20px;
          font-size: 28px;
          line-height: 32px;
          letter-spacing: 0.7px;
        }

        .left-subtitle {
          font-weight: 300;
          font-size: 22px;
          line-height: 28px;
          letter-spacing: 0.55px;
          color: var(--greyish);

          @media (max-width: 768px) {
            margin-bottom: 8px;
          }
        }
      }

      .right {
        .text,
        .decoration {
          font-family: var(--second-font);
          color: var(--greyish);
          font-weight: 400;
          margin-left: 8px;

          &.active {
            color: white;
          }
        }

        .text:hover {
          cursor: pointer;
          color: white;
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

      @media (max-width: 768px) {
        margin-bottom: 24px;
      }

      &:nth-last-child(2) {
        margin-bottom: 80px;

        @media (max-width: 768px) {
          margin-bottom: 50px;
        }
      }

      .color {
        width: 16px;
        height: 16px;
        display: inline-block;
        margin-right: 20px;
        border-radius: 50%;
      }

      .category-input {
        color: var(--greyish);
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
      display: flex;
      justify-content: center;

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

        @media (max-width: 425px) {
          padding: 10px 28px;
          font-size: 16px;
          margin: 0px 10px;
        }

        @media (max-width: 375px) {
          padding: 8px 20px;
          font-size: 14px;
        }

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
    flex-direction: column;
    align-items: center;

    .item-settings {
      display: flex;
      margin-bottom: 32px;

      .left {
        padding: 8px;
        border-radius: 50%;
        background-color: var(--orangeish);
        align-self: baseline;
        margin-right: 16px;
        margin-top: 5px;
      }

      .right {
        width: 100%;

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

            @media (max-width: 375px) {
              margin-right: 8px;
            }
          }

          .buttons {
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid var(--greyish);
            padding-bottom: 8px;
            min-width: 78px;

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
              color: var(--greyish);
            }
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
          color: var(--greyish);

          @media (max-width: 375px) {
            font-size: 12px;
          }
        }

        .mins {
          color: #fff;
        }
      }
    }

    .buttons {
      margin-top: 80px;
      display: flex;
      justify-content: center;

      @media (max-width: 425px) {
        margin-top: 50px;
      }

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

        @media (max-width: 425px) {
          padding: 10px 28px;
          font-size: 16px;
          margin: 0px 10px;
        }

        @media (max-width: 375px) {
          padding: 8px 20px;
          font-size: 14px;
        }

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
}
</style>
