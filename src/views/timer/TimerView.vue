<template>
  <div>
    <TodoTasks :todos="timerTodo" :typeOfTodos="'timerTodo'" />
    <v-card class="timer-wrap">
      <v-tabs
        class="bar-nav"
        @change="changeCurrentTimer"
        purple
        v-model="currentTimer"
        background-color="var(--greyish)"
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
            <v-btn
              class="start-btn"
              color="var(--greenish)"
              dark
              @click="start"
            >
              <v-icon left>mdi-play</v-icon>
              <span class="btn-text">Start</span>
            </v-btn>

            <v-btn
              class="pause-btn"
              color="var(--orangeish)"
              dark
              @click="pause"
            >
              <v-icon left class="icon-btn">mdi-pause</v-icon>
              <span class="btn-text">Pause</span>
            </v-btn>

            <v-btn class="reset-btn" color="var(--redish)" dark @click="reset">
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TodoTasks from "@/components/TodoTasks.vue";

export default {
  name: "Pomodoro-main",
  components: {
    TodoTasks,
  },
  data() {
    return {
      timerInstance: null,
      totalSeconds: null,
      currentTimer: 0,
      tabs: null,
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
    ...mapGetters({
      timerTodo: "tasks/timerTodo",
      tabsStore: "timer/tabs",
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
  beforeMount() {
    this.tabs = this.tabsStore;
  },
  mounted() {
    this.totalSeconds = this.tabs[0].totalSeconds;
    this.disableButton(this.pauseBtn, this.resetBtn);
    this.enableButton(this.startBtn);
  },
  watch: {
    totalSeconds: {
      handler() {
        if (this.totalSeconds === 0) {
          this.disableButton(this.startBtn, this.pauseBtn);
          clearInterval(this.timerInstance);
          this.timerInstance = null;

          document.querySelector("audio").play();
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.timer-wrap {
  width: 50%;
  margin: 100px auto;
  position: relative;
  box-shadow: 0px 0px 20px 20px rgba(141, 165, 184, 0.3) !important;
  transition: all 0.3s ease-out;
  border-radius: 0px 15px 0px 15px;

  &:hover {
    border-radius: 15px 0px 15px 0px;
    transform: scale(1.05);
    box-shadow: 0px 0px 20px 20px rgba(130, 199, 224, 0.3);
  }

  @media (max-width: 1024px) {
    width: 70%;
  }

  @media (max-width: 550px) {
    width: 90%;
  }

  .bar-nav {
    .v-tabs {
      width: 100%;

      .v-slide-group__prev {
        display: none !important;
      }
    }

    .bar-tab {
      margin: 0 auto;

      .bar-tab-text {
        @media (max-width: 425px) {
          display: none;
        }
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

        @media (max-width: 768px) {
          margin: 60px 0;
        }

        @media (max-width: 550px) {
          font-size: 80px;
        }

        @media (max-width: 425px) {
          font-size: 70px;
        }

        @media (max-width: 320px) {
          font-size: 50px;
        }
      }

      .btn-wrap {
        display: flex;
        margin: 0 auto 50px;
        justify-content: space-between;

        @media (max-width: 768px) {
          flex-direction: column;
          align-items: center;
        }

        @media (max-width: 425px) {
          margin-bottom: 30px;
        }

        .v-btn {
          margin: 0 10px;
          flex: 1;

          @media (max-width: 768px) {
            width: 80%;
            margin: 8px 0 0 0;
            padding: 4px 8px;
          }

          @media (max-width: 425px) {
            margin-top: 20px;
          }
        }

        .v-btn:first-of-type {
          margin-left: 0;
        }

        .v-btn:last-of-type {
          margin-right: 0;
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

@media (max-width: 1024px) {
  .bar-nav::v-deep > .v-item-group > .v-slide-group__prev {
    display: none !important;
  }

  .bar-nav::v-deep
    > div:first-child
    > .v-slide-group__wrapper
    > .v-slide-group__content {
    flex: 1 1 auto;
  }
}

@media (max-width: 375px) {
  .v-tab {
    min-width: inherit;
  }
}
</style>
