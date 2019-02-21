import axios from 'axios';
import Viatic from '../models/viatic';
export default {
    namespaced: true,
    state: {
        viaticsUser: [],
        pendingViatics: [],
        viaticsInProcess: [],
        editingViatic: new Viatic(),
        viaticFoundIt : new Viatic()
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
        },
        setViaticFoundIt: (state, payload) => {
            state.viaticFoundIt = payload;
        },
        setEditingViatic: (state, payload) => {
            state.editingViatic = payload;
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
        },
        loadViatic: ({dispatch, commit}, payload) => {
            dispatch('updateStateLoadingResource', true, {root:true})
            axios.get(`/viatics/${payload.id}`)
            .then(response => {
                if(response.data.success){
                    if(payload.toEdit){
                        commit('setEditingViatic', response.data.data)
                    }
                    else {
                        commit('setViaticFoundIt', response.data.data)
                    }
                }
            })
            .finally(() => {
                dispatch('updateStateLoadingResource', false, {root:true})
            })
        }

    },
    getters: {
        getViaticsUser: state => state.viaticsUser,
        gePendingViatics: state => state.pendingViatics,
        getViaticsInProcess: state => state.viaticsInProcess,
        getEditingViatic: state => state.editingViatic,
        getViaticFoundIt: state => state.viaticFoundIt,
    }
}