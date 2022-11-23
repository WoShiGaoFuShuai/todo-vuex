<template>
  <div class="settings">
    <div class="top-wrapper">
      <div class="main-text">
        <div class="left">
          <h1 class="left-title">Settings</h1>
          <h2 class="left-subtitle">{{ subtitle }}</h2>
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
      <div class="item" v-for="(item, i) in categoryArray" :key="i">
        <span :class="['color', item.value]"></span>
        <input
          class="category-input"
          type="text"
          :placeholder="item.name"
          v-model="item.name"
        />
      </div>

      <div class="buttons-categories">
        <router-link :to="{ name: 'home' }">
          <button class="tasks">Go to Tasks</button>
        </router-link>
        <button @click="saveNewCategories" class="save">Save</button>
      </div>
    </div>
    <div v-if="openPomodoro" class="content-settings">
      <div>
        <div
          class="item-settings"
          v-for="({ title, min, max, number, color }, i) in timers"
          :key="i"
        >
          <div :class="['left', color]">
            <span></span>
          </div>
          <div class="right">
            <div class="top">
              <span class="top-name">{{ title }}</span>

              <div class="buttons-wrapper">
                <button @click="changeNumber(title, 'minus')" class="minus">
                  <img src="@/assets/images/Minus.svg" alt="" />
                </button>
                <span class="number">{{ number }}</span>
                <button @click="changeNumber(title, 'plus')" class="plus">
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

        <div class="buttons-pomodoro">
          <router-link :to="{ name: 'home' }">
            <button class="tasks">Go to Tasks</button>
          </router-link>
          <button @click="saveSettingsTimer" class="save">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { mapGetters } from "vuex";
export default {
  name: "SettingsView",
  data() {
    return {
      timers: null,
      openPomodoro: true,
      openCategories: false,
      subtitle: "Timer settings",
    };
  },
  methods: {
    changeSettingsView(firstArg, secondArg) {
      this.openPomodoro = firstArg;
      this.openCategories = secondArg;

      if (firstArg) {
        this.subtitle = "Timer settings";
      } else {
        this.subtitle = "Categories list overview";
      }
    },
    saveNewCategories() {
      const changedCategory = {
        orange: this.categoryArray[0].name,
        blue: this.categoryArray[1].name,
        purple: this.categoryArray[2].name,
        red: this.categoryArray[3].name,
        aqua: this.categoryArray[4].name,
      };

      const notification = {
        text: "Category names were updated!",
        type: "success",
      };
      this.$store.dispatch("modals/changeCategoryNames", changedCategory);
      this.$store.dispatch("modals/pushNotification", notification);
    },
    changeNumber(title, execute) {
      const timer = this.timers.filter((item) => item.title === title)[0];

      if (execute === "plus" && timer.max > timer.number) {
        timer.number += 1;
      } else if (execute === "minus" && timer.min < timer.number) {
        timer.number -= 1;
      }
    },
    saveSettingsTimer() {
      const notification = {
        text: "Settings in the timer were updated!",
        type: "success",
      };
      this.$store.dispatch("timer/changeSettingsTimer", this.timers);
      router.push({ name: "timer" });
      this.$store.dispatch("modals/pushNotification", notification);
    },
  },
  computed: {
    ...mapGetters({
      categoryArray: "modals/categoryArray",
      settingsTimerArray: "timer/settingsTimerArray",
    }),
  },
  beforeMount() {
    this.timers = JSON.parse(JSON.stringify(this.settingsTimerArray));
  },
};
</script>

<style lang="scss" scoped>
.settings {
  margin-top: 18px;

  .top-wrapper {
    display: flex;

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
        text-transform: capitalize;
      }
    }

    .buttons-categories {
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

        &.orangeish {
          background-color: var(--orangeish);
        }

        &.purpleish {
          background-color: var(--purpleish);
        }

        &.blueish {
          background-color: var(--blueish);
        }
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

          .buttons-wrapper {
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
              padding: 8px 0;

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

            .plus {
              padding: 4px 0;
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

    .buttons-pomodoro {
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
