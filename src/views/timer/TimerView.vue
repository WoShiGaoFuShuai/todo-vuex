<template>
  <v-card class="timer-wrap">
    <v-tabs
      class="bar-nav"
      @change="changeCurrentTimer"
      purple
      v-model="currentTimer"
      background-color="var(--grey)"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider class="slider"></v-tabs-slider>

      <v-tab v-for="(tab, index) in tabs" :key="index" class="bar-tab">
        <span class="bar-tab-text">{{ tab.name }}</span>

        <v-icon class="bar-tab-icon">{{ tab.icon }}</v-icon>
      </v-tab>
    </v-tabs>

    <v-card flat>
      <v-card-text>
        <h2>{{ displayMinutes }}:{{ displaySeconds }}</h2>

        <div class="btn-wrap">
          <v-btn class="start-btn" color="var(--green)" dark @click="start">
            <v-icon left>mdi-play</v-icon>
            <span class="btn-text">Start</span>
          </v-btn>

          <v-btn class="pause-btn" color="var(--orange)" dark @click="pause">
            <v-icon left class="icon-btn">mdi-pause</v-icon>
            <span class="btn-text">Pause</span>
          </v-btn>

          <v-btn class="reset-btn" color="var(--red)" dark @click="reset">
            <v-icon left>mdi-restart</v-icon>
            <span class="btn-text">Reset</span>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <div v-show="totalSeconds <= 0" class="stop-sound">
      <button class="btn-stop-sound" @click="stopSound">STOP!</button>
    </div>

    <audio loop controls>
      <source src="@/assets/sounds/finished-timer.mp3" />
    </audio>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Pomodoro-main",

  // props: {
  //   updatedTimers: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  data() {
    return {
      settingsModal: false,
      timerInstance: null,
      totalSeconds: null,
      currentTimer: 0,
      tabs: [
        {
          name: "Pomodoro",
          icon: "mdi-timer-sand",
          totalSeconds: 25 * 60,
        },
        {
          name: "Short Break",
          icon: "mdi-coffee-outline",
          totalSeconds: 5 * 60,
        },
        {
          name: "Long Break",
          icon: "mdi-bed",
          totalSeconds: 15 * 60,
        },
      ],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },

  computed: {
    displayMinutes() {
      let minutes = Math.floor(this.totalSeconds / 60);
      return this.formatTime(minutes);
    },
    displaySeconds() {
      let seconds = this.totalSeconds % 60;
      return this.formatTime(seconds);
    },
    startBtn() {
      return document.querySelector(".start-btn");
    },
    pauseBtn() {
      return document.querySelector(".pause-btn");
    },
    resetBtn() {
      return document.querySelector(".reset-btn");
    },
    ...mapState({
      updatedTimers: (state) => state.timer.updatedTimers,
    }),
  },
  methods: {
    stopSound() {
      const audio = document.querySelector("audio");
      audio.pause();
      audio.currentTime = 0;
      this.totalSeconds = this.tabs[this.currentTimer].totalSeconds;
      this.disableButton(this.pauseBtn, this.resetBtn);
      this.enableButton(this.startBtn);
      document.querySelector("#circle").style.display = "inline-block";
    },
    updateTimers(updatedTimers) {
      const { updatedPomodoro, updatedShortBreak, updatedLongBreak } =
        updatedTimers;
      this.tabs[0].totalSeconds = updatedPomodoro * 60;
      this.tabs[1].totalSeconds = updatedShortBreak * 60;
      this.tabs[2].totalSeconds = updatedLongBreak * 60;
    },
    showSettings() {
      // this.$emit("settingsModal");
      this.$store.commit("toggleSettingsModal");
    },
    formatTime(time) {
      if (time < 10) {
        return "0" + time;
      }
      return time.toString();
    },
    start() {
      this.timerInstance = setInterval(() => {
        this.totalSeconds = this.totalSeconds -= 1;
      }, 1000);
      this.disableButton(this.startBtn);
      this.enableButton(this.pauseBtn, this.resetBtn);
    },
    pause() {
      clearInterval(this.timerInstance);
      this.disableButton(this.pauseBtn);
      this.enableButton(this.startBtn, this.resetBtn);
    },
    reset() {
      clearInterval(this.timerInstance);
      this.disableButton(this.pauseBtn, this.resetBtn);
      this.enableButton(this.startBtn);

      this.timerInstance = null;
      this.totalSeconds = this.tabs[this.currentTimer].totalSeconds;
    },
    changeCurrentTimer(num) {
      this.currentTimer = num;
      this.reset();
    },
    disableButton(...args) {
      for (let arg of args) {
        arg.disabled = true;
        arg.classList.add("disabled");
      }
    },
    enableButton(...args) {
      for (let arg of args) {
        arg.disabled = false;
        arg.classList.remove("disabled");
      }
    },
  },
  mounted() {
    this.totalSeconds = this.tabs[0].totalSeconds;
    this.disableButton(this.pauseBtn, this.resetBtn);
    this.enableButton(this.startBtn);
    this.$emit("sendTabs", this.tabs);
  },
  watch: {
    totalSeconds: {
      handler() {
        if (this.totalSeconds === 0) {
          this.disableButton(this.startBtn, this.pauseBtn);
          clearInterval(this.timerInstance);
          this.timerInstance = null;

          document.querySelector("#circle").style.display = "none";
          document.querySelector("audio").play();
        }
      },
    },
    tabs: {
      handler() {
        this.displayMinutes;
        this.displaySeconds;
        this.reset();
        this.$emit("sendTabs", this.tabs);
      },
      deep: true,
    },
    updatedTimers: {
      handler(value) {
        this.updateTimers(value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.timer-wrap {
  width: 50%;
  margin: 50px auto;
  position: relative;

  @media (max-width: 768px) {
    width: 75%;
  }

  .bar-nav {
    background-color: red !important;
    .v-tabs {
      width: 100%;
      background-color: red !important;

      .v-slide-group__prev {
        display: none;
      }
    }

    .bar-tab {
      margin: 0 auto;

      @media (max-width: 560px) {
        font-size: 10px;
      }

      @media (max-width: 425px) {
        font-size: 6px;
      }

      @media (max-width: 375px) {
        min-width: initial;
        padding: 0 10px;
      }
    }
  }

  .v-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    margin: 0 auto;

    .v-card__text {
      h2 {
        font-size: 100px;
        display: inline-block;
        margin: 80px 0;
        align-self: center;
        justify-self: center;
        color: var(--main-bg);

        @media (max-width: 560px) {
          font-size: 80px;
        }

        @media (max-width: 400px) {
          font-size: 60px;
        }
      }

      .btn-wrap {
        display: flex;
        width: 80%;
        margin: 0 auto 50px;
        justify-content: space-between;

        @media (max-width: 400px) {
          flex-direction: column;
          margin-bottom: 30px;
        }

        .v-btn {
          margin: 0 10px;
          flex: 1;

          @media (max-width: 400px) {
            margin: 10px;
            padding: 5px 16px;
          }

          .v-btn__content {
            .btn-text {
              @media (max-width: 560px) {
                display: none;
              }
            }

            .v-icon {
              @media (max-width: 560px) {
                margin: 0;
              }
            }
          }
        }

        .v-btn:first-of-type {
          margin-left: 0;

          @media (max-width: 400px) {
            margin-left: 10px;
          }
        }

        .v-btn:last-of-type {
          margin-right: 0;

          @media (max-width: 400px) {
            margin-right: 10px;
          }
        }

        .btn-item {
          display: flex;
        }
        .disabled {
          opacity: 0.5;
          cursor: default;
        }
      }
    }
  }
}

.stop-sound {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;

  .btn-stop-sound {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 30px;
    font-weight: 600;
    letter-spacing: 2px;
    width: 70%;
    height: 20%;
    background-color: rgb(239, 83, 80);
    border-radius: 20px;
    box-shadow: 5px 5px 2px 0 rgba(239, 83, 80, 0.3);
    transition: 0.5s ease-in-out all;

    &:hover {
      transform: translate(-50%, -50%) scale(1.05);
      background-color: rgb(255, 4, 0);
    }
  }
}

audio {
  display: none;
}

#circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--grey);
  position: absolute;
  display: inline-block;
  bottom: -25px;
  right: -25px;
  cursor: pointer;
  transition: 1s ease all;
  outline: none;

  &:hover {
    background-color: var(--grey-light);
    .mdi-cog-outline::before {
      transform: rotate(360deg);
      transition: 1s ease-in-out all;
    }
  }

  .v-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: (--main-bg);
  }
}

.theme--dark.v-tabs > .v-tabs-bar {
  background-color: red !important;
}
</style>
