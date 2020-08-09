<template>
    <div>
        <el-dialog
            title="删除评论"
            :visible.sync="deleteComment.show"
            width="250px"
            :center="true"
            append-to-body
        >
            <el-select v-model="deleteComment.reason" placeholder="请选择动态删除理由">
                <el-option
                    v-for="(reason, id) in Consts.deleteReasons"
                    :key="id"
                    :label="reason"
                    :value="id"
                ></el-option>
            </el-select>
            <div slot="footer" class="dialog-footer">
                <el-button @click="deleteComment.show = false">取 消</el-button>
                <el-button
                    :loading="deleteComment.loading"
                    type="primary"
                    @click="handleDeleteConfirm"
                    :disabled="deleteComment.reason ? false : true"
                >确 定</el-button>
            </div>
        </el-dialog>
        <el-popover placement="top" trigger="hover" :disabled="!commentInfo.is_deleted">
            <div>
                <el-row>{{ '删除时间: ' + commentInfo.delete_time }}</el-row>
                <el-row>{{ '删除原因: ' + commentInfo.delete_reason }}</el-row>
            </div>
            <el-tag
                :type="getCommentStatus().tag"
                :style="'cursor: ' + getCommentStatus().cursor"
                slot="reference"
                @click="deleteDialog"
            >{{ getCommentStatus().status }}</el-tag>
        </el-popover>
    </div>
</template>

<script>
import Consts from '@/config/const'
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
const initDeleteComment = () => {
    return {
        show: false,
        reason: undefined,
        loading: false
    }
}
export default {
    name: 'CommentStatusTag',
    props: {
        commentInfo: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            Consts: Consts,
            deleteComment: initDeleteComment()
        }
    },
    methods: {
        getCommentStatus() {
            if (this.commentInfo.is_deleted) {
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
        // 显示删帖对话框
        deleteDialog() {
            // this.$emit('statusChange', 111)
            // return
            // 若当前操作的动态已被删除则什么也不做
            if (this.commentInfo.is_deleted) {
                return
            }
            // 否则显示删除对话框
            this.deleteComment.show = true
        },
        handleDeleteConfirm() {
            this.$confirm(
                '此操作将删除该评论/回复内容,此操作无法撤回,是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).then(() => {
                this.deleteComment.loading = true
                this.$store
                    .dispatch('SquareManage/deleteComment', {
                        commentId: this.commentInfo.id,
                        deleteReason: this.deleteComment.reason
                    })
                    .then(response => {
                        this.deleteComment = initDeleteComment()
                        this.$message({
                            message: response.msg,
                            type: 'success'
                        })
                        // let rootId = response.data.root_id
                        // this.$emit('infoChange', rootId)
                        this.$emit('statusChange', response.data)
                        // if (rootId === 0) {
                        //     this.getCommentList()
                        // } else {
                        //     this.getReplyList(rootId).then(() => {
                        //         // 更新回复信息
                        //         this.replyResolves[rootId](
                        //             this.replyList[rootId]
                        //         )
                        //     })
                        // }
                    })
                    .catch(error => {
                        this.deleteComment.loading = false
                        console.log(error)
                    })
            })
        }
    }
}
</script>
