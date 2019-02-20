import axios from 'axios';
import Viatic from '../models/viatic';
export default {
    namespaced: true,
    state: {
        viaticsUser: [],
        pendingViatics: [],
        viaticsInProcess: [],
        editingViatic: new Viatic(),
    },
    mutations: {
        setViaticsUser: (state, payload) => {
            state.viaticsUser = payload;
        },
        setPendingViatics: (state, payload) => {
            state.pendingViatics = payload;
        },
        setViaticsInProcess: (state, payload) => {
            state.viaticsInProcess = payload;
        },
        addViaticCurrentUser: (state, payload) => {
            state.viaticsUser = [payload, ...state.viaticsUser]
        }

    },
    actions: {
        loadViaticsUser : ({commit}) => {
            axios.get(`/viatics/byuser`)
            .then(response => {
                commit('setViaticsUser', response.data.data);
            })
        },
        loadPendingViatics: ({commit}) => {
            axios.get(`/viatics/authorize`)
            .then(response => {
                commit('setPendingViatics', response.data.data);
            })
        },
        loadViaticsInProcess: ({commit}) => {
            axios.get(`/viatics/inprocess`)
            .then(response => {
                commit('setViaticsInProcess', response.data.data);
            })
        },
        addViatic: ({dispatch, commit}, payload) => {
            axios.post(`/viatics`, payload)
            .then(response => {
                commit('addViaticCurrentUser', response.data.data)
                dispatch('syncMessage', response.data.message, {root: true})
            })
        }

    },
    getters: {
        getViaticsUser: state => state.viaticsUser,
        gePendingViatics: state => state.pendingViatics,
        getViaticsInProcess: state => state.viaticsInProcess,
    }
}