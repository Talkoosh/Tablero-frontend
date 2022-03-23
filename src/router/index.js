import { createRouter, createWebHashHistory } from 'vue-router';
import homePage from '../views/home.page.vue';
import boardsPage from '../views/boards.page.vue';
import boardPage from '../views/board.page.vue';
import taskDetails from '../components/task.details.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage,
    },
    {
      path: '/board',
      name: 'boards',
      component: boardsPage,
    },
    {
      path: '/board/:boardId',
      name: 'board',
      component: boardPage,
      children: [
        {
          path: 'card/:cardId',
          component: taskDetails,
        },
      ]
    },

  ],
});

export default router;
