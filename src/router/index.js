import { createRouter, createWebHashHistory } from 'vue-router';
import homePage from '../views/home.page.vue';
import boardPage from '../views/board.page.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage,
    },
    {
      path: '/board/:boardId',
      name: 'board',
      component: boardPage,
    },
  ],
});

export default router;
