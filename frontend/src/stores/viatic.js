import axios from 'axios';
import Viatic from '../models/viatic';
export default {
    namespaced: true,
    state: {
        viaticsUser: [],
        pendingViatics: [],
        editingViatic: new Viatic(),
    },
    mutations: {
        setViaticsUser: (state, payload) => {
            state.viaticsUser = payload;
        },
        setPendingViatics: (state, payload) => {
            state.pendingViatics = payload;
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
        }
    },
    getters: {
        getViaticsUser: state => state.viaticsUser,
        gePendingViatics: state => state.pendingViatics,
    }
}