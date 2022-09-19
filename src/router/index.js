import Vue from "vue";
import VueRouter from "vue-router";
import Schedule from "@/components/schedule.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/schedule",
    name: "schedule",
    component: Schedule,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
