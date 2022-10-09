const state = {
  settingsModal: false,
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
      totalSeconds: 10 * 60,
    },
  ],
  updatedTimers: {},
};

const mutations = {
  toggleSettingsModal(state) {
    console.log("WORKS");
    state.settingsModal = !state.settingsModal;
  },
};

export default {
  state,
  mutations,
  // actions,
  // getters,
};
