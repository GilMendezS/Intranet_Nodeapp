import axios from 'axios';
export default {
    namespaced: true,
    state: {
        positions: []
    },
    mutations: {
        setPositions: (state, payload) => {
            state.positions = payload;
        },
        addPosition: (state, payload) => {
            state.positions = [payload, ...state.positions]
        },
        updatePosition: (state, payload) => {
            const positionIdx = state.positions.findIndex( p => p.id == payload.id )
            if(positionIdx){
                state.positions[positionIdx] = payload;
            }
        },
        removePepartment: (state, payload) => {
            state.positions = state.positions.filter( p => p.id != payload.id)
        }
    },
    actions: {
        loadPositions: ({commit, rootGetters}) => {
            axios.get(`/positions`)
            .then(response => {
                commit('setPositions', response.data.data)
            })
            
        },
        createPosition: ({dispatch, commit, rootGetters}, payload) => {
            axios.post(`/positions`,payload)
            .then(response => {
                if (response.data.success){
                    commit('addPosition', response.data.data)
                }
                dispatch('syncMessage', response.data.message, {root:true})
                
            })
        },
        updatePosition: ({dispatch,commit, rootGetters}, payload) => {
            axios.put(`/positions/${payload.id}`, payload)
            .then(response => {
                dispatch('syncMessage', response.data.message, {root:true})
            })
        }
    },
    getters: {
        getPositions: state => {
            return state.positions;
        }
    }
}