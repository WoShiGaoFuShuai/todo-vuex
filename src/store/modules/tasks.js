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
        done: false,
      },
      {
        title: "333333333",
        description: "33333333333",
        estimation: 4,
        priority: "urgent",
        deadline: "2022-02-12",
        category: "work",
        id: 44444,
        done: false,
      },
      {
        title: "Learing fa a afassasasas as asas sfs fqw sa ffqwqw",
        description: "Learn something new today",
        estimation: 1,
        priority: "middle",
        deadline: "today",
        category: "sport",
        id: 3333,
        done: false,
      },
      {
        title: "123",
        description: "42ay",
        estimation: 1,
        priority: "high",
        deadline: "today",
        category: "sport",
        id: 22222,
        done: false,
      },
    ],
    deletedTodos: [],
    deleteCompletelyTaskId: null,
    dailyTodos: [],
    dailyDoneTodos: [],
    editTask: [],
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
    PUSH_TO_DAILY_TODOS(state, id) {
      //GETTING INDEX OF A TASK
      const taskIndex = state.todos.indexOf(
        ...state.todos.filter((item) => item.id === id)
      );

      //GETTING A TASK
      const task = state.todos[taskIndex];
      state.dailyTodos.push(task);

      //DELETING A TASK
      state.todos.splice(taskIndex, 1);
    },
    DELETE_DAILY_TASK(state, id) {
      const taskIndex = state.dailyTodos.indexOf(
        ...state.dailyTodos.filter((item) => item.id === id)
      );
      const task = state.dailyTodos[taskIndex];

      state.deletedTodos.push(task);
      state.dailyTodos.splice(taskIndex, 1);
    },
    DONE_TASK(state, id) {
      const taskIndex = state.dailyTodos.indexOf(
        ...state.dailyTodos.filter((item) => item.id === id)
      );
      const task = state.dailyTodos[taskIndex];
      task.done = true;

      state.dailyDoneTodos.push(task);
      state.dailyTodos.splice(taskIndex, 1);
    },
    DELETE_DONE_DAILY_TASK(state, id) {
      const taskIndex = state.dailyDoneTodos.indexOf(
        ...state.dailyDoneTodos.filter((item) => item.id === id)
      );
      const deletedTask = state.dailyDoneTodos[taskIndex];
      state.deletedTodos.push(deletedTask);

      state.dailyDoneTodos.splice(taskIndex, 1);
    },
    EDIT_TASK_GLOBAL(state, id) {
      console.log("WORKING");

      const taskIndex = state.todos.indexOf(
        ...state.todos.filter((item) => item.id === id)
      );
      const taskToEdit = state.todos[taskIndex];
      console.log("TASKINDEX, TASK TO EDIT", taskIndex, taskToEdit);
      state.editTask.push(taskToEdit);
    },
    EDIT_TASK_DAILY(state, id) {
      const taskIndex = state.dailyTodos.indexOf(
        ...state.dailyTodos.filter((item) => item.id === id)
      );
      const taskToEdit = state.dailyTodos[taskIndex];
      state.editTask.push(taskToEdit);
    },
    CLEAR_EDIT_TASK(state) {
      state.editTask = [];
    },
    ADD_EDITED_TODO_GLOBAL(state, payload) {
      let taskIndex = state.todos.indexOf(
        ...state.todos.filter((item) => item.id === payload.id)
      );

      if (taskIndex === -1) {
        let taskIndex = state.dailyTodos.indexOf(
          ...state.dailyTodos.filter((item) => item.id === payload.id)
        );
        state.dailyTodos.splice(taskIndex, 1, payload);
      } else {
        state.todos.splice(taskIndex, 1, payload);
      }
    },
    DELETE_ALL_DONE_TASKS(store) {
      console.log(...store.dailyDoneTodos);
      store.deletedTodos.push(...store.dailyDoneTodos);
      store.dailyDoneTodos = [];
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
    pushToDailyTodos({ commit }, id) {
      commit("PUSH_TO_DAILY_TODOS", id);
    },
    deleteDailyTask({ commit }, id) {
      commit("DELETE_DAILY_TASK", id);
    },
    doneTask({ commit }, id) {
      commit("DONE_TASK", id);
    },
    deleteDoneDailyTask({ commit }, id) {
      commit("DELETE_DONE_DAILY_TASK", id);
    },
    editTaskGlobal({ commit }, id) {
      commit("EDIT_TASK_GLOBAL", id);
    },
    editTaskDaily({ commit }, id) {
      commit("EDIT_TASK_DAILY", id);
    },
    clearEditTask({ commit }) {
      commit("CLEAR_EDIT_TASK");
    },
    addEditedTodoGlobal({ commit }, payload) {
      commit("ADD_EDITED_TODO_GLOBAL", payload);
    },
    deleteAllDoneTasks({ commit }) {
      commit("DELETE_ALL_DONE_TASKS");
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
    dailyTodos(state) {
      return state.dailyTodos;
    },
    dailyDoneTodos(state) {
      return state.dailyDoneTodos;
    },
    editTask(state) {
      return state.editTask;
    },
  },
};
