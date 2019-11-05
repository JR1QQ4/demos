import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/movie",
    name: "movie",
    component: () => import("../views/Movie.vue"),
    children: [
      {
        path: "hot",
        name: "hot",
        component: () => import("@/views/movieitems/Hot.vue")
      },
      {
        path: "top250",
        name: "top250",
        component: () => import("@/views/movieitems/Top250.vue"),
      },
      {
        path: "future",
        name: "future",
        component: () => import("@/views/movieitems/Future.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
