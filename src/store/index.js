import Vue from "vue";
import Vuex from "vuex";
import modals from "@/store/modules/modals";
import timer from "@/store/modules/timer";
import tasks from "@/store/modules/tasks";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: { modals, timer, tasks },
});
