import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/styles/style.css";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

export const app = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
