import Vue from 'vue'
import Vuex from 'vuex'
import auth from './stores/auth';
import areas from './stores/area';
import users from './stores/user';
import departments from './stores/department';
import positions from './stores/position';
import projects from './stores/project';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    areas,
    users,
    departments,
    positions,
    projects
  },
  state: {
    api: '/api/v1',
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
