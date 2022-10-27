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
        id: 111111,
      },
      {
        title: "333333333",
        description: "33333333333",
        estimation: 4,
        priority: "urgent",
        deadline: "2022-02-12",
        category: "work",
        id: 44444,
      },
      {
        title: "Learing fa a afassasasas as asas sfs fqw sa ffqwqw",
        description: "Learn something new today",
        estimation: 1,
        priority: "middle",
        deadline: "today",
        category: "sport",
        id: 3333,
      },
      {
        title: "123",
        description: "42ay",
        estimation: 1,
        priority: "high",
        deadline: "today",
        category: "sport",
        id: 22222,
      },
    ],
    deletedTodos: [],
    deleteCompletelyTaskId: null,
    dailyTodos: [{ title: "daily" }],
  }),

  mutations: {
    ADD_NEW_TODO(state, payload) {
      state.todos.push(payload);
    },
    DELETE_TASK(state, payload) {
      //GETTING INDEX OF TASK WHICH MUST BE REMOVED
      const taskIndex = state.todos.indexOf(
        ...state.todos.filter((item) => item.id === payload)
      );
      // GETTING DELETED TASK TO PUSH IT TO ARRAY WITH DELETED TODOS
      const deletedTask = state.todos.filter((item) => item.id === payload);
      state.deletedTodos.push(...deletedTask);

      // DELETING TASK FROM ARRAY TODOS
      state.todos.splice(taskIndex, 1);
    },
    REMOVE_COMPLETELY_DELETED_TASK(state) {
      //GETTING INDEX OF TASK WHICH MUST BE REMOVED
      const taskIndex = state.deletedTodos.indexOf(
        ...state.deletedTodos.filter(
          (item) => item.id === state.deleteCompletelyTaskId
        )
      );

      // DELETING TASK FROM ARRAY DELETED TODOS MEANS WE DELETE THIS TASK COMPLETELY AND RESET deleteCompletelyTaskId
      state.deletedTodos.splice(taskIndex, 1);
      state.deleteCompletelyTaskId = null;
    },
    CHANGE_DELETE_COMPLETELY_TASK_INDEX(state, index) {
      state.deleteCompletelyTaskId = index;
    },
    RESET_DELETE_COMPLETELY_TASK_ID(state) {
      state.deleteCompletelyTaskId = null;
    },
  },
  actions: {
    addNewTodo({ commit }, payload) {
      commit("ADD_NEW_TODO", payload);
    },
    deleteTask({ commit }, id) {
      commit("DELETE_TASK", id);
    },
    removeCompletelyDeletedTask({ commit }) {
      commit("REMOVE_COMPLETELY_DELETED_TASK");
    },
    changeDeleteCompletelyTaskId({ commit }, index) {
      commit("CHANGE_DELETE_COMPLETELY_TASK_INDEX", index);
    },
    resetDeleteCompletelyTaskId({ commit }) {
      commit("RESET_DELETE_COMPLETELY_TASK_ID");
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
    deletedTodos(state) {
      return state.deletedTodos;
    },
  },
};
