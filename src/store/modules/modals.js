const state = {
  isOpenAddTaskModal: true,
};

export const mutationModals = {
  toggleModals: "[modals] toggleModals",
  closeModals: "[modals] closeModals",
};

const mutations = {
  [mutationModals.toggleModals](state) {
    state.isOpenAddTaskModal = !state.isOpenAddTaskModal;
  },
  [mutationModals.closeModals](state) {
    state.isOpenAddTaskModal = false;
  },
};

export default {
  state,
  mutations,
  // actions,
  // getters,
};
