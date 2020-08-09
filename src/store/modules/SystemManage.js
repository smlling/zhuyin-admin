import request from '@/utils/request'

const getDefaultState = () => {
    return {
        adminList: {
            list: []
        },
        logList: {
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
        Object.assign(state.adminList, data)
    },
    UPDATE_ADMIN_ITEM: (state, data) => {
        const { tableIndex, adminInfo } = data
        Object.assign(state.adminList.list[tableIndex], adminInfo)
    },
    ADD_ADMIN_ITEM: (state, data) => {
        state.adminList.list.unshift(data)
    },
    SET_LOGLIST: (state, data) => {
        Object.assign(state.logList, data)
    }
}

const actions = {
    adminList({ commit }, params) {
        return new Promise((resolve, reject) => {
            request({
                url: 'SystemManage/admin/list',
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
    freezeAdmin({ commit }, data) {
        const { tableIndex, params } = data
        return new Promise((resolve, reject) => {
            request({
                url: 'SystemManage/admin/freeze',
                method: 'post',
                data: params
            }).then(response => {
                if (tableIndex >= 0) {
                    commit('UPDATE_ADMIN_ITEM', { tableIndex: tableIndex, userInfo: response.data })
                }
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    unfreezeAdmin({ commit }, data) {
        const { tableIndex, params } = data
        return new Promise((resolve, reject) => {
            request({
                url: 'SystemManage/admin/unfreeze',
                method: 'post',
                data: params
            }).then(response => {
                if (tableIndex >= 0) {
                    commit('UPDATE_ADMIN_ITEM', { tableIndex: tableIndex, userInfo: response.data })
                }
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    resetAdmin({ commit }, data) {
        return new Promise((resolve, reject) => {
            request({
                url: 'SystemManage/admin/reset',
                method: 'post',
                data: data
            }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    addAdmin({ commit }, data) {
        return new Promise((resolve, reject) => {
            request({
                url: 'SystemManage/admin/add',
                method: 'post',
                data: data
            }).then(response => {
                commit('ADD_ADMIN_ITEM', response.data)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    logList({ commit }, params) {
        return new Promise((resolve, reject) => {
            request({
                url: 'SystemManage/admin/log/list',
                method: 'get',
                params: params
            }).then(response => {
                commit('SET_LOGLIST', response.data)
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
