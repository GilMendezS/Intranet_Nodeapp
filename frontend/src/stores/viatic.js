import axios from 'axios';
import Viatic from '../models/viatic';
export default {
    namespaced: true,
    state: {
        viaticsUser: [],
        editingViatic: new Viatic()
    },
    mutations: {
        setViaticsUser: (state, payload) => {
            state.viaticsUser = payload;
        }
    },
    actions: {
        loadViaticsUser : ({commit}) => {
            axios.get(`/viatics/byuser`)
            .then(response => {
                commit('setViaticsUser', response.data.data);
            })
        }
    },
    getters: {
        getViaticsUser: state => state.viaticsUser
    }
}