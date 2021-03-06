import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import Toasted from 'vue-toasted';
import axios from 'axios';
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);


//axios.defaults.baseURL = 'https://viatics.gmsdevelopment.com.mx/api/v1';
axios.defaults.baseURL = 'http://localhost:8081/api/v1';

Vue.use(Toasted, {
  duration:3000
})
Vue.config.productionTip = false

axios.interceptors.request.use(config => {
  store.dispatch('updateStateLoadingResource',true, {root:true})
  const token = localStorage.getItem('token');
  if(token){
    config.headers.Authorization = token;
    return config;
  }
  
  return config;
}, error => Promise.reject(error))

axios.interceptors.response.use( response => {
  store.dispatch('updateStateLoadingResource',false, {root:true})
  if(response.data && response.data.message){
    Vue.toasted.info(response.data.message)
  }
  return response
}, error => {
  store.dispatch('updateStateLoadingResource',false, {root:true})
  if(error.response){
    if (error.response.status === 401){
      store.dispatch('auth/logoutUser',null,{root:true})
      if(error.response.data.message){
        Vue.toasted.error(error.response.data.message)
      }
      else {
        Vue.toasted.info('Your sesion has expired, login again :)')
      }
      
      router.push('/');
    }
    else if(error.response.status == 403){
      if(error.response.data.message){
        Vue.toasted.error(error.response.data.message)
      }
      else {
        Vue.toasted.error('Something went wrong. Please try again.')
      }
    }
    else if(error.response.status == 404){
      if(error.response.data.message){
        Vue.toasted.error(error.response.data.message)
      }
      else {
        Vue.toasted.error('Error consutando la información del recurso solicitado')
      }
    }
    else if(error.response.status === 500){
      if(error.response.data.message){
        Vue.toasted.error(error.response.data.message)
      }
      else {
        Vue.toasted.error('Something went wrong. Please try again.')
      }
      
    }
  }
  return Promise.reject(error);
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
