import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "normal",
    component: () => import("../views/TheSettingsForm.vue"),
  },
  {
    path: "/reversed",
    name: "reversed",
    component: () => import("../views/TheSettingsFormReversed.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
