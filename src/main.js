import Vue from "vue";
import App from "./App.vue";
import vuetify from "@/plugins/vuetify";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faArrowUpRightFromSquare,
  faBookOpen,
  faCalendar,
  faCircleMinus,
  faEnvelope,
  faHouse,
  faListOl,
  faPen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleQuestion,
  faFolderOpen,
  faImage,
  faMoon,
  faPenToSquare,
  faShareFromSquare,
  faSquareMinus,
  faSun,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";

import router from "./router";
import "./assets/style/global.scss";

library.add(
  faHouse,
  faCalendar,
  faBookOpen,
  faUser,
  faEnvelope,
  faListOl,
  faTrashCan,
  faFolderOpen,
  faPenToSquare,
  faSquareMinus,
  faShareFromSquare,
  faCircleQuestion,
  faSun,
  faMoon,
  faImage,
  faArrowUpRightFromSquare,
  faPen,
  faCircleMinus
);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

// router.beforeEach((to, from, next) => {
//     console.log('beforeEach', to.path + ' - Auth: ' + auth.user.authenticated)
//     if ((to.path !== '/login' && to.path !== 'login') && !auth.user.authenticated) {
//       next({ path: '/login' })
//     } else if ((to.path === '/login' || to.path === 'login') && auth.user.authenticated) {
//       next({ path: '/' })
//     } else {
//       next()
//     }
//   })

//   // Whenerver Server Gives 401 Status Code, it logouts and redirect to login page
//   Vue.http.interceptors.push((request, next) => {
//     next(function (response) {
//       if (response.status === 401) {
//         let msg = response.body.returnMessage
//         localStorage.setItem('logoutReason', msg)
//         auth.logout()
//       }
//     })
//   })

// Html filter
Vue.filter("capitalize", function (value) {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter("humanReadableDate", function (value) {
  if (!value) return "";
  const dateString = value.toString();
  const year = parseInt(dateString.substring(0, 4), 10);
  const month = parseInt(dateString.substring(5, 7), 10) - 1;
  const day = parseInt(dateString.substring(8, 10), 10);

  const date = new Date(year, month, day);

  const options = {
    month: "long",
    day: "numeric",
    weekday: "long",
    timeZone: "America/Toronto",
  };
  return date.toLocaleString("fr-FR", options);
});

new Vue({
  el: "#app",
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
