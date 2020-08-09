<template>
    <div>
        <el-table
            v-loading="listLoading"
            :data="commentList.list"
            style="width: 100%"
            stripe
            tooltip-effect="dark"
            @sort-change="handleSortChange"
            @filter-change="handleFilterChange"
            :default-sort="{prop:'post_time', order:'descending'}"
            :tree-props="{hasChildren: 'has_reply'}"
            row-key="id"
            lazy
            :load="loadReplyList"
            highlight-current-row
        >
            <el-table-column align="center" label="ID" prop="id"></el-table-column>
            <el-table-column align="center" label="上文">
                <template slot-scope="scope">
                    <div v-if="scope.row.is_reply && !!scope.row.context">
                        <comment-reply-context
                            :replyInfo="scope.row.context"
                            @statusChange="handleCommentStatusChange"
                        ></comment-reply-context>
                    </div>
                    <div v-else-if="!scope.row.is_reply && !!scope.row.context">
                        <activity-context
                            :activityInfo="scope.row.context"
                            @contextDataChange="handleContextDataChange"
                        ></activity-context>
                    </div>
                    <div v-else>
                        <span>---</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="内容" prop="content" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="发布时间" prop="post_time" sortable></el-table-column>
            <el-table-column align="center" label="IP地址" prop="ip"></el-table-column>
            <el-table-column align="center" label="点赞数量" prop="like_count" sortable></el-table-column>
            <el-table-column align="center" label="回复数量" prop="reply_count_all" sortable>
                <template slot-scope="scope">
                    <div v-if="scope.row.reply_to === 0">
                        <span>{{ scope.row.reply_count_all }}</span>
                    </div>
                    <div v-else>
                        <span>---</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="发布者">
                <template slot-scope="scope">
                    <user-username :userInfo="scope.row.user"></user-username>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="状态"
                :filters="[{ text: '正常', value: 'available' }, { text: '删除', value: 'delete' }]"
                :filter-multiple="false"
                column-key="status"
            >
                <template slot-scope="scope">
                    <comment-status
                        :commentInfo="scope.row"
                        @statusChange="handleCommentStatusChange"
                    ></comment-status>
                </template>
            </el-table-column>
            <div style="display: flex" slot="append">
                <el-pagination
                    hide-on-single-page
                    background
                    layout="prev, pager, next"
                    :page-size="commentList.limit"
                    :page-count="commentList.total_page"
                    :current-page="commentList.page"
                    @current-change="getCommentList"
                    style="margin: auto"
                ></el-pagination>
            </div>
        </el-table>
    </div>
</template>

<style>
</style>

<script>
import Consts from '@/config/const'
import { mapGetters } from 'vuex'

const initListParams = () => {
    return {
        limit: 20,
        page: 1,
        status: 'all',
        uid: 0,
        activity_id: 0,
        sort_condition: 'post_time',
        sort_type: 'desc'
    }
}

export default {
    created: function() {
        console.log(this.$route)
        if (this.$route.query.uid > 0) {
            this.listParams.uid = this.$route.query.uid
        } else if (this.$route.query.activity > 0) {
            this.listParams.activity_id = this.$route.query.activity
        }

        this.getCommentList()
    },
    watch: {
        // 监听路由变化
        $route(to, from) {
            if (to.query.uid > 0) {
                this.listParams.uid = to.query.uid
            } else if (to.query.activity) {
                this.listParams.activity_id = to.query.activity
            } else {
                return
            }
            this.getCommentList()
        }
    },
    computed: {
        ...mapGetters({
            commentList: 'commentList',
            replyList: 'replyList'
        })
    },
    methods: {
        handleSortChange(param) {
            if (!param.order) {
                return
            }
            this.listParams.sort_condition = param.prop
            this.listParams.sort_type =
                param.order === 'ascending' ? 'asc' : 'desc'
            this.getCommentList()
        },
        handleFilterChange(filters) {
            if (
                filters.status.length === 0 &&
                this.listParams.status !== 'all'
            ) {
                this.listParams.status = 'all'
                this.getCommentList()
            } else if (
                filters.status.length === 1 &&
                this.listParams.status !== filters.status[0]
            ) {
                this.listParams.status = filters.status[0]
                this.getCommentList()
            }
        },
        getCommentList(page) {
            if (page) {
                this.listParams.page = page
            }
            this.listLoading = true
            this.$store
                .dispatch('SquareManage/commentList', this.listParams)
                .then(response => {
                    this.listLoading = false
                })
                .catch(error => {
                    this.listLoading = false
                    console.log(error)
                })
        },
        getReplyList(rootId) {
            return this.$store
                .dispatch('SquareManage/replyList', rootId)
                .then(response => {
                    return response
                })
                .catch(error => {
                    console.log(error)
                })
        },
        loadReplyList(tree, treeNode, resolve) {
            this.replyResolves[tree.id] = resolve
            this.getReplyList(tree.id).then(() => {
                resolve(this.replyList[tree.id])
            })
        },
        getCommentStatus(commentInfo) {
            if (commentInfo.delete_time) {
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
        filterStatus(value, row, column) {
            return this.getCommentStatus(row).status === value
        },
        handleContextDataChange() {
            console.log('aaa')
            this.getCommentList()
        },
        handleCommentStatusChange(commentInfo) {
            if (
                commentInfo.is_reply ||
                (!commentInfo.is_reply &&
                    commentInfo.root_id === commentInfo.reply_to)
            ) {
                // 删除的是回复(包括顶级回复)
                this.getReplyList(commentInfo.root_id).then(() => {
                    this.replyResolves[commentInfo.root_id](
                        this.replyList[commentInfo.root_id]
                    )
                })
            } else {
                // 删除的一级评论
                if (commentInfo.has_reply) {
                    // 删除的一级评论若有回复则更新其回复列表
                    this.getReplyList(commentInfo.id).then(() => {
                        this.replyResolves[commentInfo.id](
                            this.replyList[commentInfo.id]
                        )
                    })
                }

                // 更新评论列表
                this.getCommentList()
            }
        }
    },
    data() {
        return {
            Consts: Consts,
            listLoading: true,
            listParams: initListParams(),
            replyResolves: {}
        }
    }
}
</script>
