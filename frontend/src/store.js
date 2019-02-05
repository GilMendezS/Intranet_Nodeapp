import Vue from 'vue'
import Vuex from 'vuex'
import auth from './stores/auth';
import areas from './stores/area';
import users from './stores/user';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    areas,
    users
  },
  state: {
    api: 'http://localhost:8081/api/v1',
    message: ''
  },
  mutations: {
    setMessage: (state, payload) => {
      state.message = payload;
    }
  },
  actions: {
    syncMessage: ({commit}, payload) => {
      commit('setMessage', payload)
    }
  },
  getters: {
    api: state => {
      return state.api;
    },
    message: state => {
      return state.message;
    }
  }
})
