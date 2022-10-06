export default {
  state: {
    todos: null,
  },
  getters: {
    allTodos(state) {
      return state.todos;
    },
  },
  mutations: {
    pushTodos(state, payload) {
      state.todos = payload;
    },
  },
  actions: {},
  modules: {},
};
