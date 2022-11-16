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
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "schedule",
        name: "Horaire",
        component: Schedule,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "classes",
        name: "Cours",
        component: Dashboard,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "email",
        name: "Courrier",
        component: Email,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "user",
        name: "Compte",
        component: User,
        meta: {
          requiresAuth: true,
        },
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    console.log(Vue.prototype.$userInfo);
    if (!Vue.prototype.$isAuth) {
      fetch("http://localhost:8080/users/cookiesLogin", {
        method: "POST",
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            Vue.prototype.$isAuth = true;
            Vue.prototype.$userInfo = res;
            next();
          } else {
            console.log("iiii");
            Vue.prototype.$isAuth = false;
            next({ name: "login" });
          }
        });
    } else {
      next(); // go to wherever I'm going
    }
  } else {
    next(); // does not require auth, make sure to always call next()!
  }
});
export default router;
