import axios from 'axios';
export default {
    namespaced: true,
    state: {
        rfcs: []
    },
    mutations: {
        setRfcs: (state, payload) => {
            state.rfcs = payload;
        },
        disableRfc: (state, payload) => {
            const rfcIdx = state.rfcs.findIndex( r => r.id == payload.id );
            if(rfcIdx){
                state.rfcs[rfcIdx].active = false;
            }
        },
        setNewRfc: (state, payload) => {
            state.rfcs = [payload, ...state.rfcs]
        },
        setUpdatedRfc: (state, payload) => {
            const rfcIdx = state.rfcs.findIndex( r => r.id == payload.id );
            if(rfcIdx){
                state.rfcs[rfcIdx] = payload;
            }
        }
    },
    actions: {
        createRfc: ({commit}, payload) => {
            axios.post(`/rfcs`, payload)
            .then(response => {
                if(response.status == 200){{
                    commit('setNewRfc', response.data.data);
                }}
            })
        },
        loadRfcs: ({commit}) => {
            axios.get(`/rfcs`)
            .then(response => {
                commit('setRfcs', response.data.data);
            })
        },
        updateRfc: ({commit}, payload) => {
            axios.put(`/rfcs/${payload.id}`, payload)
            .then(response => {
                if(response.status == 200){
                    commit('setUpdatedRfc', payload)
                }
            })
        },
        disabledRfc: ({commit}, payload) => {
            axios.put(`/rfcs/${payload.id}/disable`)
            .then(response => {
                if(response.status == 200){
                    commit('disableRfc', payload)
                }
            })
        }
    },
    getters: {
        getRfcs: state => state.rfcs,
    }
}