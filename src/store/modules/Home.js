import request from '@/utils/request'
import { setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

const getDefaultState = () => {
    return {
        id: 0,
        username: '',
        nickname: '',
        email: '',
        phone: '',
        last_login_time: '',
        add_time: '',
        role: ''
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_ADMININFO: (state, data) => {
        Object.assign(state, data)
    }
}

const actions = {
    // 登录
    login({ commit }, loginForm) {
        // console.log(loginForm)
        const { identityType, identifier, credential } = loginForm
        // console.log(user)
        return new Promise((resolve, reject) => {
            request({
                url: 'home/login',
                method: 'post',
                data: { identity_type: identityType.trim(), identifier: identifier.trim(), credential: credential.trim() }
            }).then(response => {
                // 此处response是request.js中request()返回的res 即data = res.data
                const { data } = response
                setToken(data.token)
                // commit('SET_ADMININFO', data)
                resolve(response)
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },

    // 获取管理员信息
    getInfo({ commit }) {
        return new Promise((resolve, reject) => {
            request({
                url: 'home/info',
                method: 'get'
            }).then(response => {
                const { data } = response
                commit('SET_ADMININFO', data)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 更改管理员昵称
    changeNickname({ commit }, data) {
        console.log(data)
        return new Promise((resolve, reject) => {
            request({
                url: 'home/changeNickname',
                method: 'post',
                data: data
            }).then(response => {
                const { data } = response
                commit('SET_ADMININFO', data)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 更改管理员密码
    changePassword({ commit }, data) {
        console.log(data)
        return new Promise((resolve, reject) => {
            request({
                url: 'home/changePassword',
                method: 'post',
                data: data
            }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 注销登录
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            request({
                url: 'home/logout',
                method: 'get'
            }).then(response => {
                removeToken() // must remove  token  first
                commit('RESET_STATE')
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 移除token
    resetToken({ commit }) {
        console.log('aaa')
        return new Promise(resolve => {
            removeToken()
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
