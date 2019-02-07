export default {
    namespaced: true,
    state: {
        types: []
    },
    mutations: {
        setTypes: (state, payload) => {
            state.types = payload;
        }
    },
    actions: {
        loadTypes: ({commit, rootGetters}) => {
            fetch(`${rootGetters.api}/projects/types`)
            .then(res => res.json())
            .then(response => {
                commit('setTypes', response.data);
            })
        },
        addProject: ({dispatch, commit, rootGetters}, payload) => {
            fetch(`${rootGetters.api}/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)

            })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                if (response.success){

                }
                dispatch('syncMessage', response.message, {root: true})
            })
        }
    },
    getters: {
        getTypes: state => {
            return state.types;
        }
    }
}