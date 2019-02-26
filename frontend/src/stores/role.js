import axios from 'axios';
export default {
    namespaced: true,
    state: {
        roles: []
    },
    mutations : {
        setRoles: (state, payload) => {
            state.roles = payload;
        }
    },
    actions: {
        loadRoles: ({commit}) => {
            axios.get(`/roles`)
            .then(response => {
                if(response.status == 200){
                    commit('setRoles', response.data.data);
                }
            })
        }
    },
    getters: {
        getRoles: state => state.roles,
    }
}