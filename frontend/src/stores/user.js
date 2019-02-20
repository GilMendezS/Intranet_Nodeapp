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
        getUsers: state => state.users,
        getActiveUsers: state => state.users.filter( u => u.active).map( u => ({
            id: u.id,
            name: u.name,
            lastname: u.lastname,
            email: u.email,
            area: u.area ? u.area.title : 'N/A',
            department: u.department ? u.department.title : 'N/A',
            position: u.position ? u.position.title : 'N/A',

        })),
        getInativeUsers:state => state.users.filter( u => !u.active).map( u => ({
            id: u.id,
            name: u.name,
            lastname: u.lastname,
            email: u.email,
            area: u.area ? u.area.title : 'N/A',
            department: u.department ? u.department.title : 'N/A',
            position: u.position ? u.position.title : 'N/A',
        }))
    }
}