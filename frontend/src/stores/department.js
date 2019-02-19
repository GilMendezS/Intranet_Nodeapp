import axios from 'axios';
export default {
    namespaced: true,
    state: {
        departments: []
    },
    mutations: {
        setDepartments: (state, payload) => {
            state.departments = payload;
        },
        addDepartment: (state, payload) => {
            state.departments = [payload, ...state.departments]
        },
        updateDepartment: (state, payload) => {
            const departmentIdx = state.departments.findIndex( d => d.id == payload.id )
            if(departmentIdx){
                state.departments[departmentIdx] = payload;
            }
        },
        removeDepartment: (state, payload) => {
            state.departments = state.departments.filter( d => d.id != payload.id)
        }
    },
    actions: {
        loadDepartments: ({commit, rootGetters}) => {
            axios.get(`/departments`)
            .then(response => {
                commit('setDepartments', response.data.data)
            })
        },
        createDepartment: ({dispatch, commit, rootGetters}, payload) => {
            axios.post(`/departments`,payload)
            .then(response => {
                if (response.data.success){
                    commit('addDepartment', response.data.data)
                }
                dispatch('syncMessage', response.data.message, {root:true})
            })
        },
        updateDepartment: ({dispatch,commit, rootGetters}, payload) => {
            axios.put(`/departments/${payload.id}`, payload)
            .then(response => {
                dispatch('syncMessage', response.data.message, {root:true})
            })
        }
    },
    getters: {
        getDepartments: state => {
            return state.departments;
        }
    }
}