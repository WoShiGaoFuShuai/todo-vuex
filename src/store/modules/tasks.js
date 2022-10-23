export default {
  namespaced: true,
  state: () => ({
    todos: [
      {
        title: "000",
        description: "00",
        estimation: 3,
        priority: "low",
        deadline: "today",
        category: "work",
      },
      {
        title: "333333333",
        description: "33333333333",
        estimation: 4,
        priority: "urgent",
        deadline: "2022-02-12",
        category: "work",
      },
      {
        title: "Learing fa a afassasasas as asas sfs fqw sa ffqwqw",
        description: "Learn something new today",
        estimation: 1,
        priority: "middle",
        deadline: "today",
        category: "sport",
      },
      {
        title: "123",
        description: "42ay",
        estimation: 1,
        priority: "high",
        deadline: "today",
        category: "sport",
      },
    ],
    dailyTodos: [{ title: "daily" }],
  }),

  mutations: {
    ADD_NEW_TODO(state, payload) {
      state.todos.push(payload);
    },
  },
  actions: {
    addNewTodo({ commit }, payload) {
      commit("ADD_NEW_TODO", payload);
    },
  },
  getters: {
    todos(state) {
      return state.todos;
    },
    urgentTodos(state) {
      return state.todos.filter((todo) => todo.priority === "urgent");
    },
    highTodos(state) {
      return state.todos.filter((todo) => todo.priority === "high");
    },
    middleTodos(state) {
      return state.todos.filter((todo) => todo.priority === "middle");
    },
    lowTodos(state) {
      return state.todos.filter((todo) => todo.priority === "low");
    },
  },
};
