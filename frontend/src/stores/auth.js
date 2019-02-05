import router from '../router';
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
            localStorage.setItem('ss', JSON.stringify(payload))
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
            fetch(`${rootGetters.api}/auth/login`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then( data => {
                if (data.success){
                    commit('setToken', data.token);
                    commit('setUser', data.user);
                    router.push('/projects')
                }
                else {
                    dispatch('syncMessage', data.message, {root:true})
                }
                
            })
            .catch(err => {
                dispatch('syncMessage', 'Ha surgido un error, vuelve a intentarlo.', {root:true})
            })
        },
        logoutUser: ({commit}) => {
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
        }
    }
}