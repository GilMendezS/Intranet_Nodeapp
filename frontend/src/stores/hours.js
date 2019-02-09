export default {
    namespaced: true,
    state: {
        currentHours: [],
        allHours: []
    },
    mutations: {
        setCurrentHours: (state, payload) => {
            state.currentHours = payload;
        },
        addNewHour: (state, payload) => {
            state.currentHours = [payload, ...state.currentHours]
            state.allHours = [payload, ...state.allHours]
        },
        setAllHours: (state, payload) => {
            state.allHours = payload;
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
        },
        loadHistoryHours: ({commit, rootGetters}) => {
            fetch(`${rootGetters.api}/hours/history`, {
                headers: {
                    'Authorization': rootGetters['auth/getToken']
                }
            })
            .then(res => res.json())
            .then(response => {
                commit('setAllHours', response.data)
            })
            .catch(err => {

            })
        },
        addHour: ({dispatch, commit, rootGetters}, payload) => {
            const currentUser = rootGetters['auth/getUser'];
            payload.user_id = currentUser.id;
            payload.reg_user_id = null;
            payload.hours = parseInt(payload.hours)
            fetch(`${rootGetters.api}/hours`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': rootGetters['auth/getToken']
                },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(response => {
                if(response.success){
                    commit('addNewHour', response.data)
                }
                dispatch('syncMessage', response.message, {root:true})
            })
            .catch(err => {
                dispatch('syncMessage', 'No se pudo registrar la hora', {root:true})
            })
        }
    },
    getters: {
        getHoursOftheDay: state => {
            return state.currentHours;
        },
        getHistoryHours: state => {
            return state.allHours;
        }
    }
}