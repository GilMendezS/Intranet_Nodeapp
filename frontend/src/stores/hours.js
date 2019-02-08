export default {
    namespaced: true,
    state: {
        currentHours: []
    },
    mutations: {
        setCurrentHours: (state, payload) => {
            state.currentHours = payload;
        }
    },
    actions: {
        loadCurrentHours: ({commit, rootGetters}) => {
            fetch(`${rootGetters.api}/hours/today`, {
                headers: {
                    'Authorization': rootGetters['auth/getToken']
                }
            })
            .then(res => res.json())
            .then(response => {
                commit('setCurrentHours', response.data)
            })
            .catch(err => {

            })
        }
    },
    getters: {
        getHoursOftheDay: state => {
            return state.currentHours;
        }
    }
}