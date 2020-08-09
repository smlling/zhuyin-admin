<template>
    <el-popover placement="top" trigger="hover" :disabled="!isFreezed">
        <div v-if="isFreezed">
            <el-row>{{ '解冻时间: ' + userInfo.unfreeze_time }}</el-row>
            <el-row>{{ '冻结原因: ' + userInfo.freeze_reason }}</el-row>
        </div>
        <div v-if="isAbandon">
            <el-row>{{ '注销时间: ' + userInfo.abandon_time }}</el-row>
        </div>
        <el-tag
            slot="reference"
            style="cursor: default"
            :type="getUserStatus().tag"
        >{{ getUserStatus().status }}</el-tag>
    </el-popover>
</template>

<script>
// {
//     id: 1,
//     username: 'lwtting',
//     nickname: '人生若只如初见',
//     avatar: {
//         large: 'https://wx.lwting.top:65002/avatar/1/large',
//         small: 'https://wx.lwting.top:65002/avatar/1/small'
//     },
//     home_bg: '',
//     sex: '保密',
//     age: 12,
//     location: '四川省,南充市',
//     description: '念',
//     abandon_time: 0,
//     register_time: '2020-03-17 09:36:09',
//     unfreeze_time: 0,
//     freeze_reason: 0,
//     phone: '18828871992',
//     weibo: '0',
//     wechat: '0',
//     qq: '0',
//     last_login_time: '2020-03-17 09:36:09',
//     last_login_ip: '10.1.1.1',
//     login_failed_times: 0,
//     username_mtime: '2020-03-17 10:06:39',
//     password_mtime: '2020-03-17 10:18:56',
//     post_activity_count: 4,
//     post_comment_count: 1,
//     like_activity_count: 1,
//     device_identifier: ['asdfdsafdsafdf'],
//     is_abandon: false,
//     is_set_username: true
// }
export default {
    name: 'UserStatusTag',
    props: {
        userInfo: {
            type: Object,
            required: true
        }
    },
    computed: {
        isFreezed() {
            return !!this.userInfo.unfreeze_time
        },
        isAbandon() {
            return !!this.userInfo.is_abandon
        }
    },
    methods: {
        getUserStatus() {
            if (this.isAbandon) {
                return {
                    status: '注销',
                    tag: 'danger'
                }
            } else {
                if (this.isFreezed) {
                    return {
                        status: '冻结',
                        tag: 'warning'
                    }
                } else {
                    return {
                        status: '正常',
                        tag: 'success'
                    }
                }
            }
        }
    }
}
</script>

<style>
</style>
