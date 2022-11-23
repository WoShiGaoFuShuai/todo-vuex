import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/settings",
    name: "settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "@/views/SettingsView.vue"),
  },
  {
    path: "/timer",
    name: "timer",
    component: () =>
      import(/* webpackChunkName: "timer" */ "@/views/TimerView.vue"),
  },
  {
    path: "/deleted",
    name: "deleted",
    component: () =>
      import(/* webpackChunkName: "deleted" */ "@/views/DeletedView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
