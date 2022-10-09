<template>
  <div class="background" v-show="settingsModal">
    <div class="container">
      <div class="items-container">
        <div class="settings-item">
          <div class="item-top">
            <v-icon> mdi-timer-sand </v-icon>
            <p>Pomodoro</p>
          </div>
          <input
            type="number"
            oninput="validity.valid||(value='')"
            min="0"
            v-model="updatedTimePomodoro"
            id="updatedTimePomodoro"
            placeholder="minutes"
            @input="inputChanged(updatedTimePomodoro, 'updatedTimePomodoro')"
          />
        </div>
        <div class="settings-item">
          <div class="item-top">
            <v-icon> mdi-coffee-outline </v-icon>
            <p>Short Break</p>
          </div>
          <input
            type="number"
            oninput="validity.valid||(value='')"
            min="0"
            v-model="updatedTimeShortBreak"
            id="updatedTimeShortBreak"
            placeholder="minutes"
            @keyup="
              inputChanged(updatedTimeShortBreak, 'updatedTimeShortBreak')
            "
          />
        </div>
        <div class="settings-item">
          <div class="item-top">
            <v-icon> mdi-bed </v-icon>
            <p>Long Break</p>
          </div>

          <input
            type="number"
            oninput="validity.valid||(value='')"
            min="0"
            v-model="updatedTimeLongBreak"
            id="updatedTimeLongBreak"
            placeholder="minutes"
            @keyup="inputChanged(updatedTimeLongBreak, 'updatedTimeLongBreak')"
          />
        </div>
      </div>
      <div class="buttons-container">
        <button type="button" class="submit" @click="submitModal">
          <v-icon large>mdi-check-all</v-icon>
        </button>
        <button type="button" class="cancel" @click="closeModal">
          <v-icon large>mdi-close</v-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settings-modal",
  emits: {
    submitModal: null,
    close: null,
  },
  props: {
    settingsModal: {
      type: Boolean,
      required: true,
    },
    tabs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      updatedTimePomodoro: null,
      updatedTimeShortBreak: null,
      updatedTimeLongBreak: null,
    };
  },
  methods: {
    inputChanged() {
      const pomodoro = +document.getElementById("updatedTimePomodoro").value;
      const longBreak = +document.getElementById("updatedTimeLongBreak").value;
      const shortBreak = +document.getElementById("updatedTimeShortBreak")
        .value;
      const submit = document.querySelector(".submit");
      const inputs = document.querySelectorAll("input[type='number']");

      for (let input of inputs) {
        if (input.value === "" || input.value === "0") {
          input.parentElement.style.backgroundColor = "rgb(234, 19, 15)";
        } else {
          input.parentElement.style.backgroundColor = "#6200ea";
        }
      }
      if (!pomodoro || !longBreak || !shortBreak) {
        submit.classList.add("not-active");
        submit.disabled = true;
      } else {
        submit.classList.remove("not-active");
        submit.disabled = false;
      }
    },
    submitModal() {
      const updatedTime = {
        updatedPomodoro: +this.updatedTimePomodoro,
        updatedShortBreak: +this.updatedTimeShortBreak,
        updatedLongBreak: +this.updatedTimeLongBreak,
      };
      this.$emit("submitModal", updatedTime);
      this.closeModal();
    },
    closeModal() {
      this.setValueForInputs();
      document.querySelector(".container").classList.remove("opacity");
      this.$emit("closeModal");
    },
    setValueForInputs() {
      this.updatedTimePomodoro = this.tabs[0].totalSeconds / 60;
      this.updatedTimeShortBreak = this.tabs[1].totalSeconds / 60;
      this.updatedTimeLongBreak = this.tabs[2].totalSeconds / 60;
    },
  },
  created() {
    this.setValueForInputs();
  },
  watch: {
    settingsModal: {
      handler() {
        if (this.settingsModal) {
          this.setValueForInputs();
          this.inputChanged();

          const opacitySettings = setInterval(() => {
            document.querySelector(".container").classList.add("opacity");
            clearInterval(opacitySettings);
          }, 0);
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);

  .items-container {
    margin: 40px 0;

    @media (max-width: 320px) {
      margin: 32px 0;
    }
  }
  .container {
    width: 50%;
    min-height: 300px;
    background-color: white;
    box-shadow: 0 0 5px 6px rgba(98, 0, 234, 0.5);
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    display: flex;
    justify-content: space-around;
    transition: 0.7s ease-in opacity;

    @media (max-width: 768px) {
      width: 75%;
    }

    .settings-item {
      color: white;
      cursor: pointer;
      min-width: 75px;
      min-height: 75px;
      text-align: center;
      background-color: #6200ea;
      padding: 15px;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.2);
      transition: 0.5s ease-out all;
      transition: 0.7s ease-out background-color;

      @media (max-width: 425px) {
        height: 120px;
        width: 180px;
      }

      @media (min-width: 425px) {
        margin-left: 10px;
      }

      @media (max-width: 375px) {
        height: 120px;
        width: 150px;
      }

      @media (max-width: 320px) {
        height: 90px;
        width: 130px;
      }

      &:last-child {
        margin-bottom: 0;
      }

      &:hover {
        transform: scale(1.02) rotate(-1deg);

        .item-top {
          transform: scale(1.01) rotate(1deg);
        }
        input {
          transform: rotate(1deg);
        }
      }

      .item-top {
        display: inline-block;
        transition: 0.5s ease-out all;
        text-transform: uppercase;
        letter-spacing: 2px;

        @media (max-width: 320px) {
          padding-bottom: 10px;
        }

        .v-icon {
          color: white;

          @media (max-width: 375px) {
            font-size: 20px;
          }
        }

        p {
          @media (max-width: 375px) {
            font-size: 14px;
          }

          @media (max-width: 320px) {
            display: none;
          }
        }
      }

      input {
        display: inline-block;
        width: 50%;
        margin: 0 auto;
        align-self: center;
        text-align: center;
        border: 2px solid #f9a825;
        border-radius: 5px;
        transition: 0.5s ease-out all;
        color: white;
        outline: none;

        @media (max-width: 320px) {
          width: 80%;
        }
      }
    }
    .buttons-container {
      display: flex;
      flex-direction: column;
      justify-content: center;

      button {
        width: 76px;
        height: 76px;
        border-radius: 50%;
        background-color: #43a047;
        margin: 25px 10px;
        box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, 0.4);
        transition: 0.3s linear all;

        @media (max-width: 425px) {
          width: 50px;
          height: 50px;
        }
      }

      .submit:hover {
        background-color: rgb(63, 219, 71);
        transform: scale(1.02) rotate(25deg);

        .v-icon {
          color: white;
        }
      }

      .cancel {
        background-color: #ef5350;

        &:hover {
          background-color: rgb(234, 19, 15);
          transform: scale(1.02) rotate(25deg);
          .v-icon {
            color: white;
          }
        }
      }
    }
  }
  .not-active {
    background-color: grey !important;
  }
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.container.opacity {
  opacity: 1;
}
</style>
