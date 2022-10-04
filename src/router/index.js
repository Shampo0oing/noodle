import Vue from "vue";
import VueRouter from "vue-router";
import Schedule from "@/pages/schedule.vue";
import Home from "@/pages/landing.vue";
import Dashboard from "@/pages/dashboard.vue";
import User from "@/pages/user.vue";
import Email from "@/pages/email.vue";
import Page from "@/pages/page.vue";
import Signup from "@/pages/signup";
import Login from "@/pages/login";
import Resetpass from "@/pages/resetPassword";
import Changepass from "@/pages/changepass";

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
        path: "email",
        name: "Courrier",
        component: Email,
        auth: true,
      },
      {
        path: "user",
        name: "Compte",
        component: User,
        auth: true,
      },
    ],
  },
  {
    path: "/welcome",
    name: "Welcome",
    component: Home,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/reset",
    name: "resetPass",
    component: Resetpass,
  },
  {
    path: "/changePass/:userId/:token",
    name: "changePass",
    component: Changepass,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
