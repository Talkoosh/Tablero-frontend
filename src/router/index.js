import { createRouter, createWebHashHistory } from 'vue-router';
import homePage from '../views/home.page.vue';
import taskEdit from '../components/task.edit.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage,
    },
    {
      path: '/card/:cardId',
      component: taskEdit
    }
  ],
});

export default router;
