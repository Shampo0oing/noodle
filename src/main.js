import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from './router'

Vue.config.productionTip = false

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
    vuetify,
    router,
    render: h => h(App),
}).$mount('#app')
