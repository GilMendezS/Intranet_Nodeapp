import Vue from 'vue'
import Vuex from 'vuex'
import auth from './stores/auth';
import areas from './stores/area';
import users from './stores/user';
import departments from './stores/department';
import positions from './stores/position';
import projects from './stores/project';
import hours from './stores/hours';
import viatics from './stores/viatic';
import roles from './stores/role';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    areas,
    users,
    departments,
    positions,
    projects,
    hours,
    viatics,
    roles
  },
  state: {
    api: 'http://localhost:8081/api/v1',
    message: '',
    loadingResource: false
  },
  mutations: {
    setMessage: (state, payload) => {
      state.message = payload;
    },
    setStateLoadingResource: (state, payload) => {
      state.loadingResource = payload;
    }
  },
  actions: {
    syncMessage: ({commit}, payload) => {
      commit('setMessage', payload)
    },
    updateStateLoadingResource: ({commit}, payload) => {
      commit('setStateLoadingResource', payload);
    }
  },
  getters: {
    api: state => state.api,
    message: state => state.message,
    loadingResource: state => state.loadingResource
  }
})
