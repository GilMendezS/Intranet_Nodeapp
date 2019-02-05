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
            fetch(`${rootGetters.api}/positions`)
            .then(res => res.json())
            .then(info => {
                
                commit('setPositions', info.data)
            })
            .catch(err => {
                
            })
        },
        createPosition: ({dispatch, commit, rootGetters}, payload) => {
            fetch(`${rootGetters.api}/positions`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(response => {
                if (response.success){
                    commit('addPosition', response.data)
                }
                dispatch('syncMessage', response.message, {root:true})
                
            })
            .catch(err => {
                
            })
        },
        updatePosition: ({dispatch,commit, rootGetters}, payload) => {
            fetch(`${rootGetters.api}/positions/${payload.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(response => {
                dispatch('syncMessage', response.message, {root:true})
            })
            .catch(err => {
                
            })
        }
    },
    getters: {
        getPositions: state => {
            return state.positions;
        }
    }
}