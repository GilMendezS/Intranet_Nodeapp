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
        } 
    },
    actions: {
        loginUser: ({commit, rootGetters}, payload) => {
            fetch(`${rootGetters.api}/auth/login`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then( data => {
                commit('setToken', data.token);
                commit('setUser', data.user);
                router.push('/projects')
            })
            .catch(err => {
                Vue.$toasted.show(err)
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
        }
    }
}