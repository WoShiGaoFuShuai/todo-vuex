export default {
  namespaced: true,
  state: () => ({
    isOpenAddTaskModal: false,
    titleModal: "Add",
    isDeleteCompletelyModal: false,
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
    // toggleDeleteDoneTasksModal({ commit }) {
    //   commit("TOGGLE_DELETE_DONE_TASKS_MODAL");
    // },
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
  },
};
