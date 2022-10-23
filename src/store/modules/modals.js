export default {
  namespaced: true,
  state: () => ({
    isOpenAddTaskModal: false,
    titleModal: "Add",
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
  },
  getters: {
    isOpen(state) {
      return state.isOpenAddTaskModal;
    },
    titleModal(state) {
      return state.titleModal;
    },
  },
};
