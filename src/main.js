import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import router from './routes'

import App from './App.vue'
import vuescroll from 'vuescroll';

window.eventHub = new Vue();


Vue.use(VueRouter, axios)
Vue.use(vuescroll, {
  ops: {
    bar: {
      background: '#c1c1c1'
    }
  },
  name: 'myScroll'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
