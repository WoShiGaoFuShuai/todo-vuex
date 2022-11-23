export default {
  namespaced: true,
  state: () => ({
    tabs: [
      {
        name: "Pomodoro",
        icon: "mdi-timer-sand",
        totalSeconds: 25 * 60,
      },
      {
        name: "Short Break",
        icon: "mdi-coffee-outline",
        totalSeconds: 3 * 60,
      },
      {
        name: "Long Break",
        icon: "mdi-bed",
        totalSeconds: 10 * 60,
      },
    ],
    settingsTimerArray: [
      {
        title: "Work Time",
        min: 15,
        max: 60,
        number: 50,
        color: "orangeish",
      },

      { title: "Short Break", min: 3, max: 5, number: 5, color: "blueish" },
      {
        title: "Long Break",
        min: 15,
        max: 30,
        number: 30,
        color: "purpleish",
      },
    ],
    updatedTimers: {},
  }),
  mutations: {
    CHANGE_SETTINGS_TIMER(state, payload) {
      state.settingsTimerArray = payload;
      state.tabs[0].totalSeconds = payload[0].number * 60;
      state.tabs[1].totalSeconds = payload[1].number * 60;
      state.tabs[2].totalSeconds = payload[2].number * 60;
    },
  },
  actions: {
    changeSettingsTimer({ commit }, payload) {
      commit("CHANGE_SETTINGS_TIMER", payload);
    },
  },
  getters: {
    tabs(state) {
      return state.tabs;
    },
    settingsTimerArray(state) {
      return state.settingsTimerArray;
    },
  },
};
