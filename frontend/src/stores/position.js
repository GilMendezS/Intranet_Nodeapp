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
        removePosition: (state, payload) => {
            state.positions = state.positions.filter( p => p.id != payload.id)
        }
    },
    actions: {
        loadPositions: ({commit}) => {
            axios.get(`/positions`)
            .then(response => {
                commit('setPositions', response.data.data)
            })
            
        },
        createPosition: ({commit}, payload) => {
            axios.post(`/positions`,payload)
            .then(response => {
                if (response.data.success){
                    commit('addPosition', response.data.data)
                }                
            })
        },
        updatePosition: ({commit}, payload) => {
            axios.put(`/positions/${payload.id}`, payload)
            .then(response => {
                
            })
        },
        removePosition: ({commit}, payload) => {
            axios.delete(`/positions/${payload.id}`)
            .then(response => {
                if(response.status == 200){
                    commit('removePosition', payload);
                }
            })
        }
    },
    getters: {
        getPositions: state => {
            return state.positions;
        }
    }
}