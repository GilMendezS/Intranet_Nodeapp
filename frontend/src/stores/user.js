import axios from 'axios';
export default {
    namespaced: true,
    state: {
        users: []
    },
    mutations : {
        setUsers: (state, payload) => {
            state.users = payload;
        },
        setNewUser: (state, payload) => {
            state.users = [payload, ...state.users];
        },
        setNewStatusUser: (state, payload) => {
            const userIdx = state.users.findIndex( u => u.id == payload.id);
            if(userIdx){
                state.users[userIdx] = payload;
            }
        }
    },
    actions : {
        loadUsers: ({commit}) => {
            axios.get(`/users`)
            .then(response => {
                commit('setUsers', response.data.data)
            })
        },
        addUser: ({commit}, payload) => {
            axios.post(`/users`, payload)
            .then(response => {
                if(response.data.success){
                    commit('setNewUser',response.data.data)
                    
                }
            })
            .finally(() => {

            })
        },
        changeStatusUser: ({dispatch}, payload) => {
            axios.put(`/users/${payload.id}/changestatus`,payload)
            .then(response => {
                if(response.data.success){
                    dispatch('users/loadUsers', null, {root: true})
                }
                
            })
        }
    },
    getters: {
        getUsers: state => state.users,
        getActiveUsers: state => state.users.filter(u => u.active).map(u => ({
            id: u.id,
            name: u.name,
            lastname: u.lastname,
            email: u.email,
            active: u.active,
            area: u.area ? u.area.title : 'N/A',
            department: u.department ? u.department.title : 'N/A',
            position: u.position ? u.position.title :'N/A'
        })),
        getInactiveUsers: state => state.users.filter(u => !u.active).map(u => ({
            id: u.id,
            name: u.name,
            lastname: u.lastname,
            email: u.email,
            active: u.active,
            area: u.area ? u.area.title : 'N/A',
            department: u.department ? u.department.title : 'N/A',
            position: u.position ? u.position.title :'N/A'
        })),
        
    }
}