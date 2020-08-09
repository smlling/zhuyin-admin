import request from '@/utils/request'

const getDefaultState = () => {
    return {
        userList: {
            list: []
        }
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_STATE: (state, data) => {
        Object.assign(state.userList, data)
    },
    UPDATE_USER_ITEM: (state, data) => {
        const { tableIndex, userInfo } = data
        Object.assign(state.userList.list[tableIndex], userInfo)
    }
}

const actions = {
    UserList({ commit }, params) {
        return new Promise((resolve, reject) => {
            request({
                url: 'UserManage/user/list',
                method: 'get',
                params: params
            }).then(response => {
                const { data } = response
                commit('SET_STATE', data)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    freezeUser({ commit }, data) {
        const { tableIndex, params } = data
        return new Promise((resolve, reject) => {
            request({
                url: 'UserManage/user/freeze',
                method: 'post',
                data: params
            }).then(response => {
                if (tableIndex >= 0) {
                    commit('UPDATE_USER_ITEM', { tableIndex: tableIndex, userInfo: response.data })
                }
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    unfreezeUser({ commit }, data) {
        const { tableIndex, params } = data
        return new Promise((resolve, reject) => {
            request({
                url: 'UserManage/user/unfreeze',
                method: 'post',
                data: params
            }).then(response => {
                if (tableIndex >= 0) {
                    commit('UPDATE_USER_ITEM', { tableIndex: tableIndex, userInfo: response.data })
                }
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    resetUser({ commit }, data) {
        return new Promise((resolve, reject) => {
            request({
                url: 'UserManage/user/reset',
                method: 'post',
                data: data
            }).then(response => {
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
