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
        }
    },
    actions: {
        loadCurrentHours: ({commit, rootGetters}) => {
            axios.get(`/hours/today`)
            .then(response => {
                commit('setCurrentHours', response.data.data)
            })

        },
        loadHistoryHours: ({commit, rootGetters}) => {
            axios.get(`/hours/history`)
            .then(response => {
                commit('setAllHours', response.data.data)
            })
        },
        addHour: ({dispatch, commit, rootGetters}, payload) => {
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