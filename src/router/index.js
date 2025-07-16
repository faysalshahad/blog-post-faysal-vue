import { createRouter, createWebHistory } from "vue-router";
import BlogHomeView from "../views/BlogHomeView.vue";
import CreatePostView from "../views/CreatePostView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: BlogHomeView,
    },
    {
      path: "/add-blog",
      name: "add-blog",
      component: CreatePostView,
    },
  ],
});

export default router;
