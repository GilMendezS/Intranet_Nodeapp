export default {
    namespaced: true,
    state: {
        users: []
    },
    mutations : {
        setUsers: (state, payload) => {
            state.users = payload;
        }
    },
    actions : {
        loadUsers: ({commit, rootGetters}) => {
            fetch(`${rootGetters.api}/users`)
            .then(res => res.json())
            .then(response => {
                commit('setUsers', response.data)
            })
        }
    },
    getters: {
        getUsers: (state) => {
            return state.users;
        }
    }
}