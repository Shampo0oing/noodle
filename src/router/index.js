import Vue from "vue";
import VueRouter from "vue-router";
import Schedule from "@/pages/schedule.vue";
import Home from "@/pages/landing.vue";
import Dashboard from "@/pages/dashboard.vue";
import Page from "@/pages/page.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Page,
    children: [
      {
        path: "dashboard",
        name: "Accueil",
        component: Dashboard,
        auth: true,
      },
      {
        path: "schedule",
        name: "Horaire",
        component: Schedule,
        auth: true,
      },
      {
        path: "classes",
        name: "Cours",
        component: Dashboard,
        auth: true,
      },
      {
        path: "user",
        name: "Compte",
        component: Dashboard,
        auth: true,
      },
    ],
  },
  {
    path: "/landing",
    name: "Landing",
    component: Home,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
