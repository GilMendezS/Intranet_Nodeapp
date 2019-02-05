import Vue from 'vue'
import Vuex from 'vuex'
import auth from './stores/auth';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth
  },
  state: {
    api: 'http://localhost:8081/api/v1'
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    api: state => {
      return state.api;
    }
  }
})
