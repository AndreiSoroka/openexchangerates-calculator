import Vue from 'vue';
import App from './vue/App.vue';
import store from './vuex';
import router from './router';
import vueSmoothScroll from 'vue-smooth-scroll';

Vue.use(vueSmoothScroll);
new Vue({
  el: '#app',
  components: {App},
  render: createEl => createEl('App'),
  store,
  router
});
