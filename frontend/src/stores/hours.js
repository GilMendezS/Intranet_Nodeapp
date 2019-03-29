import axios from 'axios';
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
        },
        removeHour: (state, payload) => {
            state.currentHours = state.currentHours.filter( h => h.id != payload.id );
        }
    },
    actions: {
        loadCurrentHours: ({commit}) => {
            axios.get(`/hours/today`)
            .then(response => {
                commit('setCurrentHours', response.data.data)
            })

        },
        loadHistoryHours: ({commit}) => {
            axios.get(`/hours/history`)
            .then(response => {
                commit('setAllHours', response.data.data)
            })
        },
        addHour: ({commit, rootGetters}, payload) => {
            const currentUser = rootGetters['auth/getUser'];
            payload.user_id = currentUser.id;
            payload.reg_user_id = null;
            payload.hours = parseInt(payload.hours)
            axios.post(`${rootGetters.api}/hours`, payload)
            .then(response => {
                if(response.data.success){
                    commit('addNewHour', response.data.data)
                }
            })
        },
        removeHour: ({commit}, payload) => {
            axios.delete(`/hours/${payload.id}`)
            .then(response => {
                if(response.status == 200){
                    commit('removeHour', payload)
                }
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