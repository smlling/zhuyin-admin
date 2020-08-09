<template>
    <div>
        <el-dialog
            title="删除动态"
            :visible.sync="deleteActivity.show"
            width="250px"
            :center="true"
            append-to-body
        >
            <el-select v-model="deleteActivity.reason" placeholder="请选择动态删除理由">
                <el-option
                    v-for="(reason, id) in Consts.deleteReasons"
                    :key="id"
                    :label="reason"
                    :value="id"
                ></el-option>
            </el-select>
            <div slot="footer" class="dialog-footer">
                <el-button @click="deleteActivity.show = false">取 消</el-button>
                <el-button
                    :loading="deleteActivity.loading"
                    type="primary"
                    @click="handleDeleteConfirm"
                    :disabled="deleteActivity.reason ? false : true"
                >确 定</el-button>
            </div>
        </el-dialog>
        <el-popover placement="top" trigger="hover" :disabled="!activityInfo.is_deleted">
            <div>
                <el-row>{{ '删除时间: ' + activityInfo.delete_time }}</el-row>
                <el-row>{{ '删除原因: ' + activityInfo.delete_reason }}</el-row>
            </div>
            <el-tag
                :type="getActivityStatus().tag"
                :style="'cursor: ' + getActivityStatus().cursor"
                slot="reference"
                @click="deleteDialog"
            >{{ getActivityStatus().status }}</el-tag>
        </el-popover>
    </div>
</template>

<script>
import Consts from '@/config/const'
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
const initDeleteActivity = () => {
    return {
        show: false,
        reason: undefined,
        loading: false
    }
}
export default {
    name: 'ActivityStatusTag',
    props: {
        activityInfo: {
            type: Object,
            required: true
        },
        tableIndex: {
            type: Number,
            required: false
        }
    },
    data() {
        return {
            Consts: Consts,
            deleteActivity: initDeleteActivity()
        }
    },
    methods: {
        getActivityStatus() {
            if (this.activityInfo.is_deleted) {
                return {
                    status: '删除',
                    tag: 'danger',
                    cursor: 'not-allowed'
                }
            } else {
                if (this.activityInfo.private) {
                    return {
                        status: '隐藏',
                        tag: 'warning',
                        cursor: 'not-allowed'
                    }
                } else {
                    return {
                        status: '公开',
                        tag: 'success',
                        cursor: 'pointer'
                    }
                }
            }
        },
        // 显示删帖对话框
        deleteDialog() {
            // 若当前操作的动态已被删除则什么也不做
            if (this.activityInfo.is_deleted) {
                return
            }
            // 否则显示删除对话框
            this.deleteActivity.show = true
        },
        // 确定删除动态
        handleDeleteConfirm() {
            if (this.deleteActivity.reason) {
                this.$confirm(
                    '此操作将删除该动态内容,附件内容,及其评论信息,此操作无法撤回,是否继续?',
                    '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                )
                    .then(() => {
                        this.deleteLoading = true
                        this.$store
                            .dispatch('SquareManage/deleteActivity', {
                                tableIndex:
                                    this.tableIndex >= 0 ? this.tableIndex : -1,
                                activityId: this.activityInfo.id,
                                deleteReason: this.deleteActivity.reason
                            })
                            .then(response => {
                                this.deleteActivity = initDeleteActivity
                                this.$message({
                                    message: response.msg,
                                    type: 'success'
                                })
                                this.$emit('changeInfo')
                            })
                            .catch(() => {
                                this.deleteActivity.loading = false
                                this.deleteActivity.show = false
                            })
                    })
                    .catch(() => {
                        this.$message({
                            message: '操作已取消',
                            type: 'info'
                        })
                    })
            }
        }
    }
}
</script>
