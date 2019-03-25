import axios from 'axios';
import Viatic from '../models/viatic';
export default {
    namespaced: true,
    state: {
        viaticsUser: [],
        pendingViatics: [],
        viaticsInProcess: [],
        editingViatic: new Viatic(),
        viaticFoundIt : new Viatic(),
        statuses: []
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
        },
        setStatusesViatics: (state, payload) => {
            state.statuses = payload;
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
        },
        approveViatic: ({commit}, payload) => {
            axios.put(`/viatics/${payload.id}/approve`, payload)
            .then(response => {
                console.log(response.data);
            })
        },
        denyViatic: ({commit}, payload) => {
            axios.put(`/viatics/${payload.id}/deny`, payload)
            .then(response => {
                console.log(response.data);
            })
        },
        loadStatusesViatics: ({commit}) => {
            axios.get(`/status/viatics`)
            .then(response => {
                commit('setStatusesViatics', response.data.data);
            })
        },
        changeStatusViatic: ({dispatch}, payload) => {
            axios.put(`/viatics/${payload.id}/changestatus`, payload)
            .then(response => {
                
            })
        }

    },
    getters: {
        getViaticsUser: state => state.viaticsUser,
        gePendingViatics: state => state.pendingViatics,
        getViaticsInProcess: state => state.viaticsInProcess,
        getEditingViatic: state => state.editingViatic,
        getViaticFoundIt: state => state.viaticFoundIt,
        getStatuses: state => state.statuses,
    }
}