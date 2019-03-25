import axios from 'axios';
export default {
    namespaced: true,
    state: {
        areas: []
    },
    mutations: {
        setAreas: (state, payload) => {
            state.areas = payload;
        },
        addArea: (state, payload) => {
            state.areas = [payload, ...state.areas]
        },
        updateArea: (state, payload) => {
            const areaIdx = state.areas.findIndex( a => a.id == payload.id )
            if(areaId){
                state.areas[areaIdx] = payload;
            }
        },
        removeArea: (state, payload) => {
            state.areas = state.areas.filter( a => a.id != payload.id)
        }
    },
    actions: {
        loadAreas: ({commit, rootGetters}) => {
            axios.get(`/areas`)
            .then(response => {
                commit('setAreas', response.data.data)
            })
            
        },
        createArea: ({dispatch, commit, rootGetters}, payload) => {
            axios.post(`/areas`,payload)
            .then(response => {
                commit('addArea', response.data.data)
                
            })
        },
        updateArea: ({dispatch,commit, rootGetters}, payload) => {
            axios.put(`/areas/${payload.id}`, payload)
            .then(response => {
                
            })
        },
        removeArea: ({dispatch, commit, rootGetters}, payload) => {
            axios.delete(`/areas/${payload.id}`)
            .then(response => {
                if (response.data.success){
                    commit('removeArea', payload)
                }
                
            })
        }
    },
    getters: {
        getAreas: state => {
            return state.areas;
        }
    }
}