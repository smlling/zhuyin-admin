<template>
    <el-popover :placement="placement ? placement : 'right'" trigger="hover">
        <div>
            <el-form label-position="left" label-width="100px">
                <el-form-item label="ID">
                    <el-input disabled :placeholder="replyInfo.id"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 10}"
                        disabled
                        :placeholder="replyInfo.content"
                    ></el-input>
                </el-form-item>
                <el-form-item label="发布时间">
                    <el-input disabled :placeholder="replyInfo.post_time"></el-input>
                </el-form-item>
                <el-form-item label="IP地址">
                    <el-input disabled :placeholder="replyInfo.ip"></el-input>
                </el-form-item>
                <el-form-item label="上文" v-if="replyInfo.is_reply && !!replyInfo.context">
                    <ReplyContextTag
                        :replyInfo="replyInfo.context"
                        @statusChange="handleStatusChange"
                    ></ReplyContextTag>
                </el-form-item>
                <el-form-item label="状态">
                    <comment-status :commentInfo="replyInfo" @statusChange="handleStatusChange"></comment-status>
                </el-form-item>
                <el-form-item label="发布者">
                    <user-username :userInfo="replyInfo.user" placement="left"></user-username>
                </el-form-item>
            </el-form>
        </div>
        <el-tag
            slot="reference"
            style="cursor: default"
            :type="replyInfo.is_deleted ? 'danger' : 'success'"
        >{{ '评论id: ' + replyInfo.id }}</el-tag>
    </el-popover>
</template>

<script>
// {
//     "id": 2,
//     "uid": 1,
//     "root_id": 1,
//     "reply_to": 1,
//     "content": "用户1--公开动态1--评论1--回复1",
//     "post_time": "2020-03-17 11:16:23",
//     "delete_time": "2020-03-22 12:40:26",
//     "delete_reason": "涉及辱骂他人的言论",
//     "ip": "10.1.1.1",
//     "like_count": 0,
//     "reply_count": 0,
//     "reply_count_all": 0,
//     "is_reply": false,
//     "has_reply": false,
//     "is_deleted": true,
//     "user": {
//         "id": 1,
//         "username": "lwtting",
//         "nickname": "人生若只如初见",
//         "avatar": {
//             "large": "https://wx.lwting.top:65002/avatar/1/large",
//             "small": "https://wx.lwting.top:65002/avatar/1/small"
//         },
//         "home_bg": "",
//         "sex": "男",
//         "age": 12,
//         "location": "四川省,南充市",
//         "description": "念",
//         "abandon_time": 0,
//         "register_time": "2020-03-17 09:36:09",
//         "unfreeze_time": 0,
//         "freeze_reason": 0,
//         "phone": "18828871992",
//         "weibo": "",
//         "wechat": "",
//         "qq": "",
//         "last_login_time": "2020-03-17 09:36:09",
//         "last_login_ip": "10.1.1.1",
//         "login_failed_times": 0,
//         "username_mtime": "2020-03-17 10:06:39",
//         "password_mtime": "2020-03-17 10:18:56",
//         "post_activity_count": 3,
//         "post_activity_count_all": 4,
//         "post_comment_count": 1,
//         "post_comment_count_all": 1,
//         "like_activity_count": 1,
//         "device_identifier": [
//             "asdfdsafdsafdf"
//         ],
//         "is_abandon": false,
//         "is_set_username": true
//     },
//     "context": []
// }
export default {
    name: 'ReplyContextTag',
    props: {
        replyInfo: {
            type: Object,
            required: true
        },
        placement: {
            type: String,
            required: false
        }
    },
    created: () => {},
    computed: {},
    methods: {
        getReplyStatus() {
            if (this.replyInfo.is_deleted) {
                return {
                    status: '删除',
                    tag: 'danger',
                    cursor: 'not-allowed'
                }
            } else {
                return {
                    status: '正常',
                    tag: 'success',
                    cursor: 'pointer'
                }
            }
        },
        handleStatusChange(replyInfo) {
            this.$emit('statusChange', replyInfo)
        }
    }
}
</script>

<style>
</style>
