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
        addUser: (state, payload) => {
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