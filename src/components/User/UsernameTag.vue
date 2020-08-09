<template>
    <el-popover :placement="placement ? placement : 'right'" trigger="hover">
        <div>
            <el-form label-position="left" label-width="100px">
                <div style="display: flex; flex-direction: column; padding-bottom:20px">
                    <div style="margin: auto">
                        <el-avatar :src="userInfo.avatar.small" style="width: 60px; height: 60px"></el-avatar>
                    </div>
                    <div style="margin: auto; display: flex">
                        <span>
                            <svg-icon
                                v-if="userInfo.sex !== '保密'"
                                :icon-class="userInfo.sex === '男' ? 'sex-boy' : 'sex-girl'"
                                style="width: 20px; height: 20px"
                            ></svg-icon>
                        </span>

                        <span
                            v-if="userInfo.age !== '保密'"
                            :style="'background-color: ' + (userInfo.sex === '男' ? '#89C3EB' : (userInfo.sex === '女' ? '#EE827C' : '#5383C3'))"
                            style="border-radius: 5px; font-size: 1px; color: black; padding: 4px"
                        >{{ userInfo.age + '岁'}}</span>
                        <span
                            v-if="userInfo.location"
                            style="border-radius: 5px; font-size: 1px; color: black; padding: 4px; background-color: #409EFF"
                        >{{ userInfo.location }}</span>
                    </div>
                </div>
                <el-form-item label="UID">
                    <el-input disabled :placeholder="userInfo.id"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input disabled :placeholder="userInfo.username"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input disabled :placeholder="userInfo.nickname"></el-input>
                </el-form-item>
                <el-form-item label="用户状态">
                    <user-status :userInfo="userInfo"></user-status>
                </el-form-item>
                <el-form-item label="个人描述">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 10}"
                        disabled
                        :placeholder="userInfo.description"
                    ></el-input>
                </el-form-item>
                <el-form-item label="解冻时间" v-if="isFreezed">
                    <el-input disabled :placeholder="userInfo.unfreeze_time"></el-input>
                </el-form-item>
                <el-form-item label="冻结原因" v-if="isFreezed">
                    <el-input disabled :placeholder="userInfo.freeze_reason"></el-input>
                </el-form-item>
                <el-form-item label="注销时间" v-if="isAbandon">
                    <el-input disabled :placeholder="userInfo.abandon_time"></el-input>
                </el-form-item>
                <el-form-item label="手机">
                    <el-input disabled :placeholder="userInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="微博" v-if="userInfo.weibo">
                    <el-input disabled :placeholder="userInfo.weibo"></el-input>
                </el-form-item>
                <el-form-item label="微信" v-if="userInfo.wechat">
                    <el-input disabled :placeholder="userInfo.wechat"></el-input>
                </el-form-item>
                <el-form-item label="QQ" v-if="userInfo.qq">
                    <el-input disabled :placeholder="userInfo.qq"></el-input>
                </el-form-item>
                <el-form-item label="上次登陆时间">
                    <el-input disabled :placeholder="userInfo.last_login_time"></el-input>
                </el-form-item>
                <el-form-item label="上次登陆IP">
                    <el-input disabled :placeholder="userInfo.last_login_ip"></el-input>
                </el-form-item>
                <el-form-item label="注册时间">
                    <el-input disabled :placeholder="userInfo.register_time"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <el-tag
            slot="reference"
            style="cursor: pointer"
            :type="getUserStatus().tag"
            @click="$router.push({
                path: '/UserManage/UserList?uid=' + userInfo.id
            })"
        >{{ userInfo.username }}</el-tag>
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
    name: 'UsernameTag',
    props: {
        userInfo: {
            type: Object,
            required: true
        },
        placement: {
            type: String,
            required: false
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
