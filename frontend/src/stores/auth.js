import axios from 'axios';
import router from '../router';
import jwt_decode from 'jwt-decode';
export default {
    namespaced: true,
    state: {
        user: JSON.parse(localStorage.getItem('user')),
        token: localStorage.getItem('token'),
    },
    mutations: {
        setToken: (state, payload) => {
            state.token = payload;
            localStorage.setItem('token', payload)
        },
        setUser: (state, payload) => {
            state.user = payload;
            localStorage.setItem('user', JSON.stringify(payload))
        },
        logout: state => {
            state.user = null;
            state.token = null;
            localStorage.clear();
            router.push('/')
        } 
    },
    actions: {
        loginUser: ({dispatch, commit, rootGetters}, payload) => {
            axios.post(`/auth/login`,payload)
            .then( response => {
                if (response.data.success){
                    commit('setToken', response.data.token);
                    commit('setUser', response.data.user);
                    router.push('/projects')
                }
                else {
                    dispatch('syncMessage', response.data.message, {root:true})
                }
                
            })
            .catch(err => {
                
                dispatch('syncMessage', 'Ha surgido un error, vuelve a intentarlo.', {root:true})
            })
        },
        logoutUser: ({dispatch, commit}, autoLogout = false) => {
            if(autoLogout){
                dispatch('syncMessage', 'Es necesario que inicies sesión.', {root:true})
            }
            commit('logout'); 
        }
    },
    getters: {
        getUser: state => {
            return state.user;
        },
        getToken: state => {
            return state.token;
        },
        isAuthenticated: state => {
            return state.token && state.user;
        },
        getRolesCurrentUser: state => {
            try {
                return jwt_decode(state.token).roles;    
            } catch (error) {
                return [];
            }
        },
        getRolesNamesCurrentUser: state => {
            try {
                return jwt_decode(state.token).roles.map(r => r.name);    
            } catch (error) {
                return [];
            }
        }
    }
}