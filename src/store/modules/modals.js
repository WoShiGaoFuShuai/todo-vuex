export default {
  namespaced: true,
  state: () => ({
    isOpenAddTaskModal: false,
    titleModal: "Add",
    isDeleteCompletelyModal: false,
    isShowNotification: false,
    notification: {
      text: null,
      img: null,
      bg: null,
    },
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
    // TOGGLE_DELETE_DONE_TASKS_MODAL(state) {
    //   state.isDeleteDoneTasksModal = !state.isDeleteDoneTasksModal;
    // },
    CHANGE_NOTIFICATION(state, { text, type }) {
      state.isShowNotification = true;
      switch (type) {
        case "warning":
          state.notification.text = text;
          state.notification.img = require("@/assets/images/Warning-msg.svg");
          state.notification.bg = "#ffa841";
          break;
        case "error":
          state.notification.text = text;
          state.notification.img = require("@/assets/images/Error-msg.svg");
          state.notification.bg = "#f75c4c";
          break;
        case "success":
          state.notification.text = text;
          state.notification.img = require("@/assets/images/Success-msg.svg");
          state.notification.bg = "#1abc9c";
          break;
      }
    },
    CLOSE_NOTIFICATION(state) {
      state.isShowNotification = false;
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
    changeNotification({ commit }, payload) {
      commit("CHANGE_NOTIFICATION", payload);
      setTimeout(() => {
        //МОГУ ЛИ Я ТУТ ЧТО-то НАПИСАТЬ, ЧТОБЫ ЧЕРЕЗ 3500мс запустить
      }, 3500);
    },

    // toggleDeleteDoneTasksModal({ commit }) {
    //   commit("TOGGLE_DELETE_DONE_TASKS_MODAL");
    // },
    closeNotification({ commit }) {
      commit("CLOSE_NOTIFICATION");
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
    notification(state) {
      return state.notification;
    },
    isShowNotification(state) {
      return state.isShowNotification;
    },
  },
};
