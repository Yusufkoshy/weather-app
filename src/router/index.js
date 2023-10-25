import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/HomeView.vue"),
    meta: {
      title: "Home",
    },
  },

  {
    path: "/weather/:state/:city",
    name: "cityView",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CityView.vue"),
    meta: {
      title: "Weather",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${
    to.params.state ? `${to.params.city}, ${to.params.state}` : to.meta.title
  } | The Local Weather`;
  next();
});
export default router;
