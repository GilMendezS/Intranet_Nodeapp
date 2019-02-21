import axios from 'axios';
import User from '@/models/user.js';
export default {
    namespaced: true,
    state: {
        users: [],
        editingUser: new User()
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
        },
        setEditingUser: (state, payload) => {
            state.editingUser = payload;
        },
        setUpdatedUser: (state, payload) => {
            const userIdx = state.users.findIndex( u => u.id == payload.id);
            if(userIdx) {
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
           
        },
        loadUser : ({commit}, payload) => {
            axios.get(`/users/${payload}`)
            .then(response => {
                if(response.data.success){
                    commit('setEditingUser', response.data.data);
                }
            })
        },
        changeStatusUser: ({dispatch}, payload) => {
            axios.put(`/users/${payload.id}/changestatus`,payload)
            .then(response => {
                if(response.data.success){
                    dispatch('users/loadUsers', null, {root: true})
                }
                
            })
        },
        updateUserInfo: ({comit, getters}, modifiedPassword) => {
            const dataToSend = {
                name: getters.getEditingUser.name,
                lastname: getters.getEditingUser.lastname,
                area_id: getters.getEditingUser.area_id,
                department_id :getters.getEditingUser.department_id,
                position_id: getters.getEditingUser.position_id
            }
            if(modifiedPassword){
                dataToSend.password  = modifiedPassword;
            }
            axios.put(`/users/${getters.getEditingUser.id}`, dataToSend)
            .then(response => {
                console.log(response.data.data);
                if(response.data.success){
                    commit('setUpdatedUser', response.data.data);
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
        getEditingUser: state => {
            return state.editingUser;
        }
    }
}