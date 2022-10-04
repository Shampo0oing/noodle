import Vue from "vue";
import App from "./App.vue";
import vuetify from "@/plugins/vuetify";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHouse,
  faCalendar,
  faBookOpen,
  faUser,
  faListOl,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faPenToSquare,
  faFolderOpen,
  faSquareMinus,
  faShareFromSquare,
  faCircleQuestion,
  faTrashCan,
  faSun,
  faMoon,
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
  faMoon
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

new Vue({
  el: "#app",
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
