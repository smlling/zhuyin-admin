import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import Home from './modules/Home'
import SystemStatus from './modules/SystemStatus'
import UserManage from './modules/UserManage'
import SquareManage from './modules/SquareManage'
import SystemManage from './modules/SystemManage'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        Home,
        SystemStatus,
        UserManage,
        SquareManage,
        SystemManage
    },
    getters
})

export default store
