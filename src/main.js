import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store/index.js';
import './styles/style.scss';

const app = createApp(App);
app.directive('clickoutside', {
  mounted: (el, binding, vnode) => {
    // assign event to the element
    el.clickOutsideEvent = function (event) {
      // here we check if the click event is outside the element and it's children
      if (!(el == event.target || el.contains(event.target))) {
        // if clicked outside, call the provided method
        console.log(vnode);
        vnode.context[binding.expression](event);
      }
    };
    // register click and touch events
    document.body.addEventListener('click', el.clickOutsideEvent);
    document.body.addEventListener('touchstart', el.clickOutsideEvent);
  },
  unmounted: function (el) {
    // unregister click and touch events before the element is unmounted
    document.body.removeEventListener('click', el.clickOutsideEvent);
    document.body.removeEventListener('touchstart', el.clickOutsideEvent);
  },
  stopProp(event) {
    event.stopPropagation();
  },
});

app.use(store);
app.use(router);

app.mount('#app');
