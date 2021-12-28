import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/users/:user",
    name: "User",
    component: () => import(/* webpackChunkName: "user" */ "../views/Projects.vue"),
  },
  {
    path: "/users/:user/projects/:project",
    name: "Project",
    component: () => import(/* webpackChunkName: "projectdashboard" */ "../views/ProjectDashboard.vue"),
  },
  // {
  //   path: "/register",
  //   name: "Register",
  //   component: () => import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  // },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  //must be last route
  {
    path: "/notfound",
    name: "NotFound",
    component: () => import(/* webpackChunkName: "login" */ "../views/NotFound.vue"),
  },
  {
    path: "*",
    name: "Error",
    component: () => import(/* webpackChunkName: "login" */ "../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
