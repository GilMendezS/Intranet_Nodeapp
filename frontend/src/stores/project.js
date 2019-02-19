import axios from 'axios';
import Project from '../models/project';
export default {
    namespaced: true,
    state: {
        types: [],
        statuses: [],
        editingProject: new Project(),
        projectsUser: []
    },
    mutations: {
        setTypes: (state, payload) => {
            state.types = payload;
        },
        setProjectsUser: (state, payload) => {
            state.projectsUser = payload;
        },
        setStatuses: (state, payload) => {
            state.statuses = payload;
        },
        setProject: (state, payload) => {
            state.editingProject = payload;
        },
        setANewUser: (state, payload) => {
            state.editingProject.users = [payload, ...state.editingProject.users];
        },
        removeUser: (state, payload) => {
            state.editingProject.users = state.editingProject.users.filter( u => u.id != payload.id);
        },
        modifyUserInProject: (state, payload) => {
            const userIdx = state.editingProject.users.findIndex( u => u.id == payload.id );
            if (userIdx){
                state.editingProject.users[userIdx] = payload;
            }
        }
    },
    actions: {
        loadTypes: ({commit, rootGetters}) => {
            axios.get(`/projects/types`)
            .then(response => {
                commit('setTypes', response.data.data);
            })
        },
        loadStatuses: ({commit,rootGetters}) => {
            axios.get(`${rootGetters.api}/status/projects`)
            .then(response => {
                commit('setStatuses', response.data.data)
            })
        },  
        addProject: ({dispatch, commit, rootGetters}, payload) => {
            axios.post(`${rootGetters.api}/projects`, payload)
            .then(response => {
                dispatch('syncMessage', response.data.message, {root: true})
            })
        },
        loadProjectsUser: ({commit, rootGetters}) => {
            axios.get(`${rootGetters.api}/projects/byuser`)
            .then(response => {
                commit('setProjectsUser', response.data.data)
            })
        },
        getProject: ({dispatch, commit, rootGetters}, id) => {
            axios.get(`/projects/${id}`)
            .then(response => {
                commit('setProject', response.data.data);
            })
        },
        updateProject: ({dispatch, commit, rootGetters}, payload) => {
            axios.put(`/projects/${payload.id}`, payload)
            .then(response => {
                dispatch('syncMessage',response.data.message, {root:true});
            })
        },
        addUser: ({dispatch, commit, rootGetters}, payload) => {
            axios.post(`/projects/adduser/${payload.project_id}`, { user_id: payload.id })
            .then(response => {
                if (response.data.success){
                    commit('setANewUser', response.data);
                }
                dispatch('syncMessage', response.message, {root: true})
            })
        },
        removeUser: ({commit, dispatch, rootGetters}, payload) => {
            axios.post(`${rootGetters.api}/projects/removeuser/${payload.project_id}`, { user_id: payload.id })
            .then(response => {
                if (response.data.success){
                    commit('removeUser', payload);
                }
                dispatch('syncMessage', response.data.message, {root: true})
            })
        },
        changePermissions: ({dispatch, commit, rootGetters}, payload) => {
            const userData = {
                id: payload.id,
                name: payload.name,
                lastname: payload.lastname,
                email: payload.email
            }
            const user_modified = {
                ...userData,
                project_user: {
                    can_add_viatics: payload.can_add_viatics,
                    can_add_hours: payload.can_add_hours
                }
            }
            const restore_user = {
                ...userData,
                project_user: {
                    can_add_viatics: payload.is_viatic ? !payload.can_add_viatics: payload.can_add_viatics,
                    can_add_hours: payload.is_viatic ? payload.can_add_hours : !payload.can_add_hours
                }
            }
            axios.put(`${rootGetters.api}/projects/${payload.project_id}/permissions`, 
                {
                    permission: payload.permission,
                    user_id: payload.id,
                    is_viatic: payload.is_viatic
                }
            )
            .then(response => {
                if(response.data.success){
                    commit('modifyUserInProject', user_modified)
                }
                else {
                    commit('modifyUserInProject', restore_user)
                }
                dispatch('syncMessage', response.data.message, {root:true})
            })
        }
    },
    getters: {
        getTypes: state => {
            return state.types;
        },
        getStatuses: state => {
            return state.statuses;
        },
        getCurrentProject: state => {
            return state.editingProject;
        },
        getProjectsAuthenticatedUser: state => {
            return state.projectsUser;
        }
    }
}