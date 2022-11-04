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
      {
        title: "Yes",
        description: "Yes",
        estimation: 2,
        priority: "middle",
        deadline: "today",
        category: "sport",
        id: 22242142,
        done: false,
      },
      {
        title: "No",
        description: "No",
        estimation: 1,
        priority: "urgent",
        deadline: "2022-01-12",
        category: "hobby",
        id: 555555555512412,
        done: false,
      },
    ],
    deletedTodos: [],
    deleteCompletelyTaskId: null,
    dailyTodos: [],
    dailyDoneTodos: [],
    editTask: [],
    timerTodo: [],
    deleteAllDeletedTasks: false,
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
      // const deletedTask = state.todos.filter((item) => item.id === payload);
      const task = state.todos[taskIndex];
      state.deletedTodos.push(task);

      // DELETING TASK FROM ARRAY TODOS
      state.todos.splice(taskIndex, 1);

      if (state.timerTodo.length) {
        switch (state.timerTodo[0].id === task.id) {
          case true:
            state.timerTodo = [];
            break;
        }
      }
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

      if (state.timerTodo.length) {
        switch (state.timerTodo[0].id === task.id) {
          case true:
            state.timerTodo = [];
            break;
        }
      }
    },
    DONE_TASK(state, { id, type }) {
      //IF WE PRESS BUTTON DONE IN DAILY TASKS
      if (type === "daily") {
        const taskIndex = state.dailyTodos.indexOf(
          ...state.dailyTodos.filter((item) => item.id === id)
        );
        const task = state.dailyTodos[taskIndex];
        task.done = true;

        state.dailyDoneTodos.push(task);
        state.dailyTodos.splice(taskIndex, 1);

        //WE NEED TO CHECK DO WE HAVE THIS TASK IN TIMER, if YES - DELETE IN, CUZ ITS DONE
        if (state.timerTodo.length) {
          const res = state.timerTodo[0].id === task.id;
          switch (res) {
            case true:
              state.timerTodo = [];
              break;
          }
        }
      }
      // IF WE PRESS BUTTON DONE IN TIMER TASKS
      else {
        //CHECK IS THE TASK IN THE GLOBAL LIST
        let taskIndex = state.todos.indexOf(
          ...state.todos.filter((item) => item.id === id)
        );
        let task;

        switch (taskIndex) {
          //IF NOT IN GLOBAL, MEANS IT IS IN DAILY
          case -1:
            taskIndex = state.dailyTodos.indexOf(
              ...state.dailyTodos.filter((item) => item.id === id)
            );
            task = state.dailyTodos[taskIndex];
            task.done = true;
            state.dailyDoneTodos.push(task);
            state.dailyTodos.splice(taskIndex, 1);
            break;
          default:
            //GLOBAL
            task = state.todos[taskIndex];
            task.done = true;
            state.dailyDoneTodos.push(task);
            state.todos.splice(taskIndex, 1);
        }

        // console.log(taskIndex);
        // if (taskIndex === -1) {
        //   taskIndex = state.dailyTodos.indexOf(
        //     ...state.dailyTodos.filter((item) => item.id === id)
        //   );
        //   console.log(taskIndex);
        // }
      }
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
      const taskIndex = state.todos.indexOf(
        ...state.todos.filter((item) => item.id === id)
      );
      const taskToEdit = state.todos[taskIndex];
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
    ADD_EDITED_TODO(state, payload) {
      let taskIndex = state.todos.indexOf(
        ...state.todos.filter((item) => item.id === payload.id)
      );

      // IF WE HAVE -1 => IT IS NOT IN GLOBAL AND WE NEED TO CHECK IN DAILY TODOS
      if (taskIndex === -1) {
        let taskIndex = state.dailyTodos.indexOf(
          ...state.dailyTodos.filter((item) => item.id === payload.id)
        );
        state.dailyTodos.splice(taskIndex, 1, payload);

        //CHECK IF EDITED TASK FROM DAILY LIST IS IN THE TIMER AS WELL. IF YES - CHANGE IT
        if (state.timerTodo.length) {
          switch (state.timerTodo[0].id === state.dailyTodos[taskIndex].id) {
            case true:
              state.timerTodo.splice(0, 1, payload);
              break;
          }
        }
      } else {
        state.todos.splice(taskIndex, 1, payload);

        //CHECK IF EDITED TASK FROM GLOBAL LIST IS IN THE TIMER AS WELL. IF YES - CHANGE IT
        if (state.timerTodo.length) {
          switch (state.timerTodo[0].id === state.todos[taskIndex].id) {
            case true:
              state.timerTodo.splice(0, 1, payload);
              break;
          }
        }
      }
    },
    DELETE_ALL_DONE_TASKS(state) {
      state.deletedTodos.push(...state.dailyDoneTodos);
      state.dailyDoneTodos = [];
    },
    TOGGLE_DELETE_ALL_DELETED_TASKS(state) {
      state.deleteAllDeletedTasks = !state.deleteAllDeletedTasks;
    },
    DELETE_ALL_DELETED_TASKS(state) {
      state.deletedTodos = [];
    },
    GO_TO_TIMER(state, { id, type }) {
      if (type === "global") {
        const taskIndex = state.todos.indexOf(
          ...state.todos.filter((item) => item.id === id)
        );
        const task = state.todos[taskIndex];
        state.timerTodo.push(task);
      } else {
        const taskIndex = state.dailyTodos.indexOf(
          ...state.dailyTodos.filter((item) => item.id === id)
        );
        const task = state.dailyTodos[taskIndex];
        state.timerTodo.push(task);
      }
    },
    DELETE_TIMER_TODO(state) {
      state.timerTodo = [];
    },
    DELETE_DAILY_OR_GLOBAL_TASK(state, id) {
      let taskIndex = state.todos.indexOf(
        ...state.todos.filter((item) => item.id === id)
      );
      let task;

      switch (taskIndex) {
        //IF WE DONT HAVE IN IN GLOBAL IT MEASNT THE TASK IS IN DAILY
        case -1:
          taskIndex = state.dailyTodos.indexOf(
            ...state.dailyTodos.filter((item) => item.id === id)
          );
          task = state.dailyTodos[taskIndex];
          state.deletedTodos.push(task);
          state.dailyTodos.splice(taskIndex, 1);
          state.timerTodo = [];
          break;
        //IF WE HAVE THE TASK IN GLOBAL
        default:
          task = state.todos[taskIndex];
          state.deletedTodos.push(task);
          state.todos.splice(taskIndex, 1);
          state.timerTodo = [];
      }
    },
  },
  actions: {
    addNewTodo({ commit, dispatch }, payload) {
      commit("ADD_NEW_TODO", payload);
      const notification = {
        text: "A task was successfully created.",
        type: "success",
      };
      dispatch("modals/changeNotification", notification, { root: true });
      setTimeout(() => {
        dispatch("modals/closeNotification", null, { root: true });
      }, 3500);
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
    pushToDailyTodos({ state, commit, dispatch }, id) {
      //WE CHECK IF THERE IS LESS THEN 4 items we can push a task to daily tasks
      if (state.dailyTodos.length <= 4) {
        commit("PUSH_TO_DAILY_TODOS", id);
      } else {
        const notification = {
          text: "Sorry, you can have only 5 daily tasks at the same time.",
          type: "error",
        };
        dispatch("modals/changeNotification", notification, { root: true });
        setTimeout(() => {
          dispatch("modals/closeNotification", null, { root: true });
        }, 3500);
      }
    },
    deleteDailyTask({ commit }, id) {
      commit("DELETE_DAILY_TASK", id);
    },
    doneTask({ commit, dispatch }, payload) {
      commit("DONE_TASK", payload);
      const randomNum = Math.round(Math.random() * 10);
      let text;
      switch (randomNum) {
        case 0:
        case 1:
          text = "Awesome";
          break;
        case 2:
        case 3:
          text = "Great job";
          break;
        case 4:
        case 5:
          text = "Keep it up";
          break;
        case 6:
        case 7:
          text = "Nice";
          break;
        case 8:
        case 9:
          text = "Exellent";
          break;
        case 10:
          text = "You are the best";
          break;
      }
      const notification = {
        text: `The task was done! ${text}!`,
        type: "success",
      };
      dispatch("modals/changeNotification", notification, { root: true });
      setTimeout(() => {
        dispatch("modals/closeNotification", null, { root: true });
      }, 3500);
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
    addEditedTodo({ commit, dispatch }, payload) {
      commit("ADD_EDITED_TODO", payload);
      const notification = {
        text: "The task was successfully edited.",
        type: "success",
      };
      dispatch("modals/changeNotification", notification, { root: true });
      setTimeout(() => {
        dispatch("modals/closeNotification", null, { root: true });
      }, 3500);
    },
    deleteAllDoneTasks({ commit }) {
      commit("DELETE_ALL_DONE_TASKS");
    },
    toggleDeleteAllDeletedTasks({ commit }) {
      commit("TOGGLE_DELETE_ALL_DELETED_TASKS");
    },
    deleteAllDeletedTasks({ commit }) {
      commit("DELETE_ALL_DELETED_TASKS");
    },
    goToTimer({ state, commit, dispatch }, payload) {
      if (!state.timerTodo.length) {
        commit("GO_TO_TIMER", payload);
      } else {
        const notification = {
          text: "Sorry, you already have a task in a timer",
          type: "error",
        };
        dispatch("modals/changeNotification", notification, { root: true });
        // this.$router.push({ name: "home" });
        setTimeout(() => {
          dispatch("modals/closeNotification", null, { root: true });
        }, 3500);
      }
    },
    deleteTimerTodo({ commit }) {
      commit("DELETE_TIMER_TODO");
    },
    deleteDailyOrGlobalTask({ commit }, id) {
      commit("DELETE_DAILY_OR_GLOBAL_TASK", id);
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
    deleteAllDeletedTasks(state) {
      return state.deleteAllDeletedTasks;
    },
    timerTodo(state) {
      return state.timerTodo;
    },
  },
};
