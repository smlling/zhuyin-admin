<template>
    <div>
        <el-popover
            placement="top"
            trigger="hover"
            :content="userInfo.phone ? userInfo.phone : '用户未绑定手机'"
        >
            <svg-icon slot="reference" icon-class="phone"></svg-icon>
        </el-popover>
        <el-popover
            placement="top"
            trigger="hover"
            :content="userInfo.weibo ? userInfo.weibo : '用户未绑定微博'"
        >
            <svg-icon slot="reference" icon-class="weibo"></svg-icon>
        </el-popover>
        <el-popover
            placement="top"
            trigger="hover"
            :content="userInfo.wechat ? userInfo.qq : '用户未绑定微信'"
        >
            <svg-icon slot="reference" icon-class="wechat"></svg-icon>
        </el-popover>
        <el-popover
            placement="top"
            trigger="hover"
            :content="userInfo.qq ? userInfo.qq : '用户未绑定QQ'"
        >
            <svg-icon slot="reference" icon-class="qq"></svg-icon>
        </el-popover>
    </div>
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
    name: 'SocialAccountsTag',
    props: {
        userInfo: {
            type: Object,
            required: true
        }
    },
    computed: {},
    methods: {}
}
</script>

<style>
</style>
