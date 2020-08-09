<template>
    <el-popover placement="right" trigger="hover">
        <div>
            <el-form label-position="left" label-width="100px">
                <el-form-item label="ID">
                    <el-input disabled :placeholder="activityInfo.id"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 10}"
                        disabled
                        :placeholder="activityInfo.content"
                    ></el-input>
                </el-form-item>
                <el-form-item label="发布时间">
                    <el-input disabled :placeholder="activityInfo.post_time"></el-input>
                </el-form-item>
                <el-form-item label="最近评论">
                    <el-input disabled :placeholder="activityInfo.last_comment_time"></el-input>
                </el-form-item>
                <el-form-item label="点赞数量">
                    <el-input disabled :placeholder="activityInfo.like_count"></el-input>
                </el-form-item>
                <el-form-item label="评论数量">
                    <el-input disabled :placeholder="activityInfo.comment_count_all"></el-input>
                </el-form-item>
                <el-form-item label="分享数量">
                    <el-input disabled :placeholder="activityInfo.share_count"></el-input>
                </el-form-item>
                <el-form-item label="附件">
                    <activity-attach-file
                        :attachFiles="activityInfo.attach_files"
                        :activityId="activityInfo.id"
                    ></activity-attach-file>
                </el-form-item>
                <el-form-item label="状态">
                    <activity-status :activityInfo="activityInfo" @changeInfo="handleChangeInfo"></activity-status>
                </el-form-item>
                <el-form-item label="发布者">
                    <user-username :userInfo="activityInfo.user"></user-username>
                </el-form-item>
            </el-form>
        </div>
        <el-tag
            slot="reference"
            style="cursor: pointer"
            :type="activityInfo.is_deleted ? 'danger' : 'success'"
            @click="$router.push({
                path: '/SquareManage/ActivityManage?id=' + activityInfo.id
            })"
        >{{ '动态id: ' + activityInfo.id }}</el-tag>
    </el-popover>
</template>

<script>
// {
// "id": 3,
// "uid": 1,
// "content": "用户1公开动态发布测试2",
// "post_time": "2020-03-17 10:44:01",
// "private": false,
// "last_comment_time": "2020-03-22 10:28:47",
// "delete_time": 0,
// "delete_reason": 0,
// "attach_files": {
//     "image_count": 2,
//     "video_count": 0,
//     "images_list": {
//         "9": {
//             "large": "https://wx.lwting.top:65002/admin/SquareManage/activity/attach/9/large",
//             "small": "https://wx.lwting.top:65002/admin/SquareManage/activity/attach/9/small"
//         },
//         "10": {
//             "large": "https://wx.lwting.top:65002/admin/SquareManage/activity/attach/10/large",
//             "small": "https://wx.lwting.top:65002/admin/SquareManage/activity/attach/10/small"
//         }
//     },
//     "videos_list": []
// },
// "ip": "10.1.1.1",
// "like_count": 0,
// "comment_count": 1,
// "comment_count_all": 0,
// "share_count": 0,
// "is_deleted": false,
// "user": {
//     "id": 1,
//     "username": "lwtting",
//     "nickname": "人生若只如初见",
//     "avatar": {
//         "large": "https://wx.lwting.top:65002/avatar/1/large",
//         "small": "https://wx.lwting.top:65002/avatar/1/small"
//     },
//     "home_bg": "",
//     "sex": "男",
//     "age": 12,
//     "location": "四川省,南充市",
//     "description": "念",
//     "abandon_time": 0,
//     "register_time": "2020-03-17 09:36:09",
//     "unfreeze_time": 0,
//     "freeze_reason": 0,
//     "phone": "18828871992",
//     "weibo": "",
//     "wechat": "",
//     "qq": "",
//     "last_login_time": "2020-03-17 09:36:09",
//     "last_login_ip": "10.1.1.1",
//     "login_failed_times": 0,
//     "username_mtime": "2020-03-17 10:06:39",
//     "password_mtime": "2020-03-17 10:18:56",
//     "post_activity_count": 3,
//     "post_activity_count_all": 4,
//     "post_comment_count": 1,
//     "post_comment_count_all": 1,
//     "like_activity_count": 1,
//     "device_identifier": [
//         "asdfdsafdsafdf"
//     ],
//     "is_abandon": false,
//     "is_set_username": true
// }
export default {
    name: 'ActivityContextTag',
    props: {
        activityInfo: {
            type: Object,
            required: true
        }
    },
    methods: {
        handleChangeInfo() {
            this.$emit('contextDataChange')
        }
    }
}
</script>

<style>
</style>
