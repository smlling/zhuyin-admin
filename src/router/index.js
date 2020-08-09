import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            redirect: '/SystemManage/Dashboard',
            component: () => import('@/views/index'),
            children: [
                {
                    path: 'SystemManage',
                    name: '系统状态',
                    redirect: '/SystemManage/Dashboard',
                    component: () => import('@/views/frames'),
                    children: [
                        {
                            path: 'Dashboard',
                            name: '系统总览',
                            component: () => import('@/views/frames/SystemManage/Dashboard')
                        },
                        {
                            path: 'AdminList',
                            name: '管理员列表',
                            component: () => import('@/views/frames/SystemManage/AdminList')
                        },
                        {
                            path: 'LogList',
                            name: '管理员日志',
                            component: () => import('@/views/frames/SystemManage/LogList')
                        }
                    ]
                },
                {
                    path: 'DramManage',
                    name: '鼓点管理',
                    component: () => import('@/views/frames'),
                    children: [
                        {
                            path: 'DramList',
                            name: '鼓点列表',
                            component: () => import('@/views/frames/DramManage/DramList')
                        },
                        {
                            path: 'DramSetting',
                            name: '鼓点设置',
                            component: () => import('@/views/frames/DramManage/DramSetting')
                        }
                    ]
                },
                {
                    path: 'SquareManage',
                    name: '广场管理',
                    component: () => import('@/views/frames'),
                    children: [
                        {
                            path: 'ActivityManage',
                            name: '动态管理',
                            component: () => import('@/views/frames/SquareManage/ActivityManage')
                        },
                        {
                            path: 'ReportManage',
                            name: '举报管理',
                            component: () => import('@/views/frames/SquareManage/ReportManage')
                        },
                        {
                            path: 'CommentManage',
                            name: '评论管理',
                            component: () => import('@/views/frames/SquareManage/CommentManage')
                        },
                        {
                            path: 'SquareSetting',
                            name: '社区设置',
                            component: () => import('@/views/frames/SquareManage/SquareSetting')
                        }
                    ]
                },
                {
                    path: 'UserManage',
                    name: '用户管理',
                    component: () => import('@/views/frames'),
                    children: [
                        {
                            path: 'UserList',
                            name: '用户列表',
                            component: () => import('@/views/frames/UserManage/UserList')
                        },
                        {
                            path: 'UserSetting',
                            name: '用户设置',
                            component: () => import('@/views/frames/UserManage/UserSetting')
                        }
                    ]
                },
                {
                    path: 'AdvertiseManage',
                    name: '广告管理',
                    component: () => import('@/views/frames'),
                    children: [
                        {
                            path: 'LunchAD',
                            name: '首屏广告',
                            component: () => import('@/views/frames/AdvertiseManage/LunchAD')
                        },
                        {
                            path: 'SwiperAD',
                            name: '轮播广告',
                            component: () => import('@/views/frames/AdvertiseManage/SwiperAD')
                        }
                    ]
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/login'),
            meta: {
                title: '主音后台-登录'
            }
        },
        {
            path: '/404',
            name: 'PageNotFound',
            component: () => import('@/views/404'),
            meta: {
                title: '主音后台-登录'
            }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || '主音后台'
    next()
})
export default router
