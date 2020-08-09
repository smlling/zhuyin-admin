import request from '@/utils/request'

const getDefaultState = () => {
    return {
        user: {
            available: 0,
            freezed: 0,
            abandon: 0
        },
        square_activity: {
            available: 0,
            private: 0,
            delete: 0
        }
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_DASHBOARD: (state, data) => {
        Object.assign(state, data)
        // console.log(this)
    }
}

const actions = {
    dashboard({ commit }) {
        // console.log(login)
        return new Promise((resolve, reject) => {
            request({
                url: 'SystemManage/dashboard',
                method: 'get'
            }).then(response => {
                const { data } = response
                commit('SET_DASHBOARD', data)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
