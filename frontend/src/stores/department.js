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
            fetch(`${rootGetters.api}/departments`)
            .then(res => res.json())
            .then(info => {
                
                commit('setDepartments', info.data)
            })
            .catch(err => {
                
            })
        },
        createDepartment: ({dispatch, commit, rootGetters}, payload) => {
            fetch(`${rootGetters.api}/departments`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(response => {
                if (response.success){
                    commit('addDepartment', response.data)
                }
                dispatch('syncMessage', response.message, {root:true})
                
            })
            .catch(err => {
                
            })
        },
        updateDepartment: ({dispatch,commit, rootGetters}, payload) => {
            fetch(`${rootGetters.api}/departments/${payload.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(response => {
                dispatch('syncMessage', response.message, {root:true})
            })
            .catch(err => {
                
            })
        }
    },
    getters: {
        getDepartments: state => {
            return state.departments;
        }
    }
}