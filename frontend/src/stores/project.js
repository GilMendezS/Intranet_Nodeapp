import Project from '../models/project';
export default {
    namespaced: true,
    state: {
        types: [],
        editingProject: new Project()
    },
    mutations: {
        setTypes: (state, payload) => {
            state.types = payload;
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
                if (response.success){
                    
                }
                dispatch('syncMessage', response.message, {root: true})
            })
        },
        getProject: ({dispatch, commit, rootGetters}, id) => {
            fetch(`${rootGetters.api}/projects/${id}`)
            .then(res => res.json())
            .then(response => {
                commit('setProject', response.data);
            })
        },
        addUser: ({dispatch, commit, rootGetters}, payload) => {
            fetch(`${rootGetters.api}/projects/adduser/${payload.project_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: payload.id })
            })
            .then(res => res.json())
            .then(response => {
                if (response.success){
                    commit('setANewUser', response.data);
                }
                dispatch('syncMessage', response.message, {root: true})
            })
            .catch(err => {
                console.log(err)
            })
        },
        removeUser: ({commit, dispatch, rootGetters}, payload) => {
            fetch(`${rootGetters.api}/projects/removeuser/${payload.project_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: payload.id })
            })
            .then(res => res.json())
            .then(response => {
                if (response.success){
                    commit('removeUser', payload);
                }
                dispatch('syncMessage', response.message, {root: true})
            })
            .catch(err => {
                console.log(err)
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
            fetch(`${rootGetters.api}/projects/${payload.project_id}/permissions`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    permission: payload.permission,
                    user_id: payload.id,
                    is_viatic: payload.is_viatic
                })
                
            })
            .then(res => res.json())
            .then(response => {
                if(response.success){
                    commit('modifyUserInProject', user_modified)
                }
                else {
                    commit('modifyUserInProject', restore_user)
                }
                dispatch('syncMessage', response.message, {root:true})
            })
            .catch(err => {
                commit('modifyUserInProject', restore_user)
                dispatch('syncMessage', "Ha surgido un error al actualizar los permisos", {root:true})
            })
        }
    },
    getters: {
        getTypes: state => {
            return state.types;
        },
        getCurrentProject: state => {
            return state.editingProject;
        }
    }
}