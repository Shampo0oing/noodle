import Vue from 'vue'
import VueRouter  from "vue-router"
import Main from "@/components/main.vue"
import Schedule from "@/components/schedule.vue"

Vue.use(VueRouter);

const routes = [
    {
        path: "/home",
        name: "home",
        component: Main,
    },
    {
        path: "/schedule",
        name: "schedule",
        component: Schedule,
    },
]

const router = new VueRouter({
    routes
});

export default router