import Vue from "vue";
import Vuex from "vuex";
import modals from "@/store/modules/modals";
import timer from "@/store/modules/timer";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [
      {
        title: "11",
        description: "22",
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
        title: "44",
        description: "444",
        estimation: 1,
        priority: "middle",
        deadline: "today",
        category: "sport",
      },
    ],
    dailyTodos: [{ title: "aa" }],
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: { modals, timer },
});
