// 导航侧栏配置

const menu = {
    SystemManage: {
        name: '系统状态',
        icon: 'el-icon-s-data',
        disable: false,
        frames: {
            Dashboard: {
                name: '系统总览',
                route: 'Dashboard',
                disable: false
            },
            AdminList: {
                name: '管理员列表',
                disable: false,
                superadmin: true
            },
            LogList: {
                name: '管理员日志',
                disable: false,
                superadmin: true
            }
        }
    },
    DramManage: {
        name: '鼓点管理',
        icon: 'el-icon-s-flag',
        disable: false,
        frames: {
            DramList: {
                name: '鼓点列表',
                disable: false
            },
            DramSetting: {
                name: '鼓点设置',
                disable: false
            }
        }
    },
    SquareManage: {
        name: '广场管理',
        icon: 'el-icon-s-comment',
        disable: false,
        frames: {
            ActivityManage: {
                name: '动态管理',
                disable: false
            },
            CommentManage: {
                name: '评论管理',
                disable: false
            },
            ReportManage: {
                name: '举报管理',
                disable: true
            },
            SquareSetting: {
                name: '广场设置',
                disable: false
            }
        }
    },
    UserManage: {
        name: '用户管理',
        icon: 'el-icon-user-solid',
        disable: false,
        frames: {
            UserList: {
                name: '用户列表',
                disable: false
            },
            UserSetting: {
                name: '用户设置',
                disable: false
            }
        }
    },
    AdvertiseManage: {
        name: '广告管理',
        icon: 'el-icon-s-platform',
        disable: false,
        frames: {
            LunchAD: {
                name: '首屏广告',
                disable: false
            },
            SwiperAD: {
                name: '轮播广告',
                disable: false
            }
        }
    }
}

export default menu
