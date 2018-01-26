import Vue from 'vue'
import App from './app.vue'
import store from './store'

new Vue({
  el: '#app',
  render: h => h(App),
  store
});
