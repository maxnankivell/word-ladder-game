import { createApp } from "vue";
import App from "./App.vue";
import WithTopBarView from "./views/WithTopBarView.vue";
import GameView from "./views/GameView.vue";
import HistoryView from "./views/HistoryView.vue";
import "@/assets/css/global.scss";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: WithTopBarView,
      children: [
        {
          path: "",
          component: GameView,
        },
        {
          path: "history",
          component: HistoryView,
        },
      ],
    },
    { path: "/:notFound(.*)", redirect: "/" },
  ],
});

createApp(App).use(router).use(createPinia()).mount("#app");
