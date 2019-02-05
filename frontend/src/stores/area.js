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
            fetch(`${rootGetters.api}/areas`)
            .then(res => res.json())
            .then(info => {
                commit('setAreas', info.data)
            })
            
        },
        createArea: ({dispatch, commit, rootGetters}, payload) => {
            fetch(`${rootGetters.api}/areas`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(response => {
                commit('addArea', response.data)
                dispatch('syncMessage', 'Área creada con éxito.', {root:true})
            })
            .catch(err => {
                console.log(err)
            })
        },
        updateArea: ({dispatch,commit, rootGetters}, payload) => {
            fetch(`${rootGetters.api}/areas/${payload.id}`, {
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
                console.log(err)
            })
        },
        removeArea: ({dispatch, commit, rootGetters}, payload) => {
            fetch(`${rootGetters.api}/area/${payload.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(response => {
                if (response.success){
                    commit('removeArea', area)

                }
                dispatch('syncMessage', response.message, {root:true})
            })

        }
    },
    getters: {
        getAreas: state => {
            return state.areas;
        }
    }
}