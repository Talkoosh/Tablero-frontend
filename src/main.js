import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store/index.js';
import debounce from './services/debouncer.js'
import './styles/style.scss';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import gAuthPlugin from 'vue3-google-oauth2'


const app = createApp(App);
app.directive('clickoutside', {
  mounted: (el, binding) => {
    setTimeout(() => {
      el.clickOutsideEvent = function (event) {
        if (!(el == event.target || el.contains(event.target))) {
          binding.value(event, el);
        }
      };
      document.body.addEventListener('click', el.clickOutsideEvent);
      document.body.addEventListener('touchstart', el.clickOutsideEvent);
    }, 100);
  },
  unmounted: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
    document.body.removeEventListener('touchstart', el.clickOutsideEvent);
  },
  stopProp(event) {
    event.stopPropagation();
  },
});

app.use(ElementPlus)

app.directive('debounce', (el, binding) => debounce(el, binding))


app.use(store);
app.use(router);


app.mount('#app');
