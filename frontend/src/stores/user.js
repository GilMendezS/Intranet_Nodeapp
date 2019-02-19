import axios from 'axios';
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
            axios.get(`/users`)
            .then(response => {
                commit('setUsers', response.data.data)
            })
        }
    },
    getters: {
        getUsers: (state) => {
            return state.users;
        }
    }
}