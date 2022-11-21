export default {
  namespaced: true,
  state: () => ({
    isOpenAddTaskModal: false,
    titleModal: "Add",
    isDeleteCompletelyModal: false,
    timeout: null,
    // notification: {
    //   text: null,
    //   img: null,
    //   bg: null,
    // },
    arrayNotification: [],
    categoryArray: [
      {
        name: "Work",
        className: "orangeish",
        value: "work",
      },
      { name: "Education", className: "blueish", value: "education" },
      { name: "Hobby", className: "pinkish", value: "hobby" },
      { name: "Sport", className: "redish", value: "sport" },
      { name: "Other", className: "aquaish", value: "other" },
    ],
    // isDeleteDoneTasksModal: false,
  }),
  mutations: {
    TOGGLE_MODALS(state) {
      state.isOpenAddTaskModal = !state.isOpenAddTaskModal;
    },
    CHANGE_TITLE_MODALS(state, payload) {
      if (state.titleModal !== payload) {
        state.titleModal = payload;
      }
      return;
    },
    CLOSE_MODALS(state) {
      state.isOpenAddTaskModal = false;
    },
    TOGGLE_DELETE_COMPLETELY_MODAL(state) {
      state.isDeleteCompletelyModal = !state.isDeleteCompletelyModal;
    },
    PUSH_NOTIFICATION(state, payload) {
      console.log("push-notif", payload);

      switch (payload.type) {
        case "warning":
          payload.img = require("@/assets/images/Warning-msg.svg");
          payload.bg = "#ffa841";
          break;
        case "error":
          payload.img = require("@/assets/images/Error-msg.svg");
          payload.bg = "#f75c4c";
          break;
        case "success":
          payload.img = require("@/assets/images/Success-msg.svg");
          payload.bg = "#1abc9c";
          break;
      }

      state.arrayNotification.push(payload);
    },
    CLOSE_NOTIFICATION(state, payload) {
      const index = state.arrayNotification.indexOf(
        state.arrayNotification.find(
          (notification) => notification.id === payload
        )
      );
      state.arrayNotification.splice(index, 1);
    },
    CHANGE_CATEGORY_NAMES(state, { orange, blue, purple, red, aqua }) {
      state.categoryArray[0].name = orange;
      state.categoryArray[1].name = blue;
      state.categoryArray[2].name = purple;
      state.categoryArray[3].name = red;
      state.categoryArray[4].name = aqua;
    },
  },
  actions: {
    toggleModals({ commit }) {
      commit("TOGGLE_MODALS");
    },
    changeTitleModals({ commit }, payload) {
      commit("CHANGE_TITLE_MODALS", payload);
    },
    closeModals({ commit }) {
      commit("CLOSE_MODALS");
    },
    toggleDeleteCompletelyModal({ commit }) {
      commit("TOGGLE_DELETE_COMPLETELY_MODAL");
    },
    pushNotification({ state, commit }, payload) {
      payload.id = Math.round(Math.random() * 10000000);
      commit("PUSH_NOTIFICATION", payload);
      setTimeout(() => {
        const indexOfNotification = state.arrayNotification.indexOf(
          state.arrayNotification.find(
            (notification) => notification.id === payload.id
          )
        );
        // IF WE HAVE THE NOTIFICATION we will delete it after 3500ms
        if (indexOfNotification !== -1) {
          state.arrayNotification.splice(indexOfNotification, 1);
        }
      }, 3500);
    },

    // toggleDeleteDoneTasksModal({ commit }) {
    //   commit("TOGGLE_DELETE_DONE_TASKS_MODAL");
    // },
    closeNotification({ commit }, payload) {
      commit("CLOSE_NOTIFICATION", payload);
    },
    changeCategoryNames({ commit }, payload) {
      commit("CHANGE_CATEGORY_NAMES", payload);
    },
  },
  getters: {
    isOpen(state) {
      return state.isOpenAddTaskModal;
    },
    titleModal(state) {
      return state.titleModal;
    },
    isDeleteCompletelyOpen(state) {
      return state.isDeleteCompletelyModal;
    },
    // isDeleteDoneTasksModal(state) {
    //   return state.isDeleteDoneTasksModal;
    // },
    // notification(state) {
    //   return state.notification;
    // },
    categoryArray(state) {
      return state.categoryArray;
    },
    arrayNotification(state) {
      return state.arrayNotification;
    },
  },
};
