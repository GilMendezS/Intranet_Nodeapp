import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import Toasted from 'vue-toasted';
import VModal from 'vue-js-modal';


Vue.use(Toasted, {
  duration:3000
})
Vue.use(VModal, { dialog: true })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
