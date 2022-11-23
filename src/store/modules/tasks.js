export default {
  namespaced: true,
  state: () => ({
    todos: [
      {
        category: "other",
        deadline: "2022-11-29",
        description: "Oranges, Cucumbers, Carrots",
        done: false,
        estimation: 3,
        id: 0.2269693874029507,
        isItExpired: false,
        isItToday: false,
        priority: "low",
        title: "Buy groceries",
      },
      {
        category: "education",
        deadline: "2022-11-12",
        description: "Pages 25-28",
        done: false,
        estimation: 2,
        id: 0.22659693874829507,
        isItExpired: false,
        isItToday: false,
        priority: "urgent",
        title: "Do homework (Biology)",
      },
      {
        category: "work",
        deadline: "2022-12-12",
        description: "Report about results of the research",
        done: false,
        estimation: 5,
        id: 0.12659693874029507,
        isItExpired: false,
        isItToday: false,
        priority: "high",
        title: "Make a report",
      },
      {
        category: "hobby",
        deadline: "2023-01-05",
        description: "Finish drawing of the fish and drawing of the landscape",
        done: false,
        estimation: 4,
        id: 0.126596938740295997,
        isItExpired: false,
        isItToday: false,
        priority: "middle",
        title: "Finish drawings",
      },
      {
        category: "hobby",
        deadline: "2022-12-30",
        description: "Do yoga for 30 mins, learn 1 new position",
        done: false,
        estimation: 1,
        id: 0.126596938740295997,
        isItExpired: false,
        isItToday: false,
        priority: "low",
        title: "Do yoga",
      },
    ],
    deletedTodos: [],
    deleteCompletelyTaskId: null,
    dailyTodos: [],
    dailyDoneTodos: [],
    editTask: [],
    timerTodo: [],
    deleteAllDeletedTasks: false,
    todayInStore: "2022-11-21",
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
      if (id === "example") {
        const tasksForExample = [
          {
            category: "education",
            deadline: state.todayInStore,
            description: "History Exam (repeat 1-12 units)",
            done: false,
            estimation: 1,
            id: 0.1252167876541,
            isItExpired: false,
            isItToday: true,
            priority: "urgent",
            title: "Prepare to the exam",
          },
          {
            category: "other",
            deadline: "2022-10-30",
            description: "Find HTML/CSS course and Typescript",
            done: false,
            estimation: 2,
            id: 0.12576531244029507,
            isItExpired: true,
            isItToday: false,
            priority: "high",
            title: "Find a course",
          },
          {
            category: "work",
            deadline: state.todayInStore,
            description:
              "Count how many days I was working in October and November",
            done: false,
            estimation: 3,
            id: 0.2898765462131244029507,
            isItExpired: false,
            isItToday: true,
            priority: "middle",
            title: "Calculate salary",
          },
          {
            category: "hobby",
            deadline: state.todayInStore,
            description: "Legs day & Shoulders",
            done: false,
            estimation: 4,
            id: 0.9462131244012507,
            isItExpired: false,
            isItToday: true,
            priority: "low",
            title: "Gym",
          },
        ];
        state.dailyTodos.push(...tasksForExample);
        return;
      }
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
    ADD_EDITED_TODO(state, { taskIndex, type, payload }) {
      if (type === "daily") {
        state.dailyTodos.splice(taskIndex, 1, payload);

        // CHECK IF EDITED TASK FROM DAILY LIST IS IN THE TIMER AS WELL. IF YES - CHANGE IT
        if (state.timerTodo.length) {
          switch (state.timerTodo[0].id === state.dailyTodos[taskIndex].id) {
            case true:
              state.timerTodo.splice(0, 1, payload);
              break;
          }
        }
      } else {
        state.todos.splice(taskIndex, 1, payload);

        // CHECK IF EDITED TASK FROM GLOBAL LIST IS IN THE TIMER AS WELL. IF YES - CHANGE IT
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
    SET_TODAY_DATE(state) {
      const date = new Date();

      let day = date.getDate();
      if (day < 10) {
        day = "0" + day;
      }

      let month = date.getMonth();
      if (month < 10) {
        month = month + 1;
        month = "0" + month;
      } else {
        month = month + 1;
      }
      state.todayInStore = `${date.getFullYear()}-${month}-${day}`;
    },
    CHECK_DEADLINE(state, typeOfTodos) {
      const todayDeadline = state.todayInStore;
      const todayDate = +todayDeadline.slice(-2);
      const todayMonth = +todayDeadline.slice(-5, -3);
      const todayYear = +todayDeadline.slice(0, 4);

      let currentTodos;
      switch (typeOfTodos) {
        case "global":
          currentTodos = state.todos;
          break;

        case "daily":
          currentTodos = state.dailyTodos;
          break;

        case "doneDaily":
          currentTodos = state.dailyDoneTodos;
          break;

        case "deleted":
          currentTodos = state.deletedTodos;
          break;
      }

      currentTodos.forEach((todo) => {
        const todoDate = +todo.deadline.slice(-2);
        const todoMonth = +todo.deadline.slice(-5, -3);
        const todoYear = +todo.deadline.slice(0, 4);

        if (
          todoDate === todayDate &&
          todoMonth === todayMonth &&
          todoYear === todayYear
        ) {
          todo.isItToday = true;
          return;
        } else if (
          todoDate < todayDate &&
          (todoMonth === todayMonth || todoMonth < todayMonth) &&
          (todoYear === todayYear || todoYear < todayYear)
        ) {
          todo.isItExpired = true;
          todo.isItToday = false;
        }
      });
    },
    SORT_TASKS(state, typeOfTodos) {
      function compare(a, b) {
        if (a.deadline < b.deadline) {
          return -1;
        }
        if (a.deadline > b.deadline) {
          return 1;
        }
        return 0;
      }

      let todosToSort;

      switch (typeOfTodos) {
        case "global":
          todosToSort = state.todos;
          break;

        case "daily":
          todosToSort = state.dailyTodos;
          break;

        case "doneDaily":
          todosToSort = state.dailyDoneTodos;
          break;

        case "deleted":
          todosToSort = state.deletedTodos;
          break;
      }

      todosToSort.sort(compare);
    },
  },
  actions: {
    addNewTodo({ commit, dispatch }, payload) {
      commit("ADD_NEW_TODO", payload);
      const notification = {
        text: "A task was successfully created.",
        type: "success",
      };
      dispatch("modals/pushNotification", notification, { root: true });
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
      //EXAMPLE
      if (id === "example") {
        commit("PUSH_TO_DAILY_TODOS", id);
        dispatch("sortTasks", "daily");
        return;
      }
      //WE CHECK IF THERE IS LESS THEN 4 items we can push a task to daily tasks
      if (state.dailyTodos.length <= 4) {
        commit("PUSH_TO_DAILY_TODOS", id);
        dispatch("sortTasks", "daily");
      } else {
        const notification = {
          text: "Sorry, you can have only 5 daily tasks at the same time.",
          type: "error",
        };
        dispatch("modals/pushNotification", notification, { root: true });
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
      dispatch("modals/pushNotification", notification, { root: true });
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
    addEditedTodo({ state, commit, dispatch }, payload) {
      let taskIndex = state.todos.indexOf(
        ...state.todos.filter((item) => item.id === payload.id)
      );

      // IF WE HAVE -1 => IT IS NOT IN GLOBAL AND WE NEED TO CHECK IN DAILY TODOS
      if (taskIndex === -1) {
        let taskIndex = state.dailyTodos.indexOf(
          ...state.dailyTodos.filter((item) => item.id === payload.id)
        );
        commit("ADD_EDITED_TODO", { taskIndex, type: "daily", payload });
        dispatch("sortTasks", "daily");
      } else {
        commit("ADD_EDITED_TODO", { taskIndex, type: "global", payload });
        dispatch("sortTasks", "global");
      }

      const notification = {
        text: "The task was successfully edited.",
        type: "success",
      };
      dispatch("modals/pushNotification", notification, { root: true });
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
        dispatch("modals/pushNotification", notification, { root: true });
      }
    },
    deleteTimerTodo({ commit }) {
      commit("DELETE_TIMER_TODO");
    },
    deleteDailyOrGlobalTask({ commit }, id) {
      commit("DELETE_DAILY_OR_GLOBAL_TASK", id);
    },
    setTodayDate({ commit }) {
      commit("SET_TODAY_DATE");
    },
    checkDeadline({ commit }, payload) {
      commit("CHECK_DEADLINE", payload);
    },
    sortTasks({ commit }, payload) {
      commit("SORT_TASKS", payload);
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
    todayInStore(state) {
      return state.todayInStore;
    },
  },
};
