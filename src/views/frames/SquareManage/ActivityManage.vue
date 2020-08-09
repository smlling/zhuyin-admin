<template>
    <div>
        <el-table
            v-loading="listLoading"
            :data="activityList.list"
            style="width: 100%"
            stripe
            @sort-change="handleSortChange"
            @filter-change="handleFilterChange"
            tooltip-effect="dark"
            :default-sort="{prop:'post_time', order:'descending'}"
            highlight-current-row
        >
            <el-table-column align="center" label="ID" prop="id"></el-table-column>
            <el-table-column align="center" label="内容" prop="content" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="发布时间" prop="post_time" sortable="custom"></el-table-column>
            <el-table-column align="center" label="最近评论" prop="last_comment_time" sortable="custom"></el-table-column>
            <el-table-column align="center" label="点赞数量" prop="like_count" sortable="custom"></el-table-column>
            <el-table-column align="center" label="分享数量" prop="share_count" sortable="custom"></el-table-column>
            <el-table-column align="center" label="评论数量" prop="comment_count_all" sortable="custom">
                <template slot-scope="scope">
                    <el-tag
                        style="cursor: pointer"
                        type="success"
                        @click="$router.push({
                path: '/SquareManage/CommentManage?activity=' + scope.row.id
            })"
                    >{{ scope.row.comment_count_all }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="附件">
                <template slot-scope="scope">
                    <activity-attach-file
                        :attachFiles="scope.row.attach_files"
                        :activityId="scope.row.id"
                    ></activity-attach-file>
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
                :filters="[{ text: '公开', value: 'available' }, { text: '隐藏', value: 'private' }, { text: '删除', value: 'delete' }]"
                :filter-multiple="false"
                column-key="status"
            >
                <template slot-scope="scope">
                    <activity-status :activityInfo="scope.row" :tableIndex="scope.$index"></activity-status>
                </template>
            </el-table-column>
            <div style="display: flex" slot="append">
                <el-pagination
                    hide-on-single-page
                    background
                    layout="prev, pager, next"
                    :page-size="activityList.limit"
                    :page-count="activityList.total_page"
                    :current-page="activityList.page"
                    @current-change="getActivityList"
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
        id: 0,
        sort_condition: 'post_time',
        sort_type: 'desc'
    }
}

export default {
    created: function() {
        if (this.$route.query.uid > 0) {
            this.listParams.uid = this.$route.query.uid
        } else if (this.$route.query.id) {
            this.listParams.id = this.$route.query.id
        } else if (this.$route.query.status) {
            this.listParams.status = this.$route.query.status
        }

        this.getActivityList()
    },
    watch: {
        // 监听路由变化
        $route(to, from) {
            if (to.query.uid > 0) {
                this.listParams.uid = this.$route.query.uid
            } else if (to.query.id) {
                this.listParams.id = this.$route.query.id
            }

            this.getActivityList()
        }
    },
    computed: {
        ...mapGetters({
            activityList: 'activityList',
            attachFiles: 'attachFiles'
        }),
        disableDeleteConfirm: function() {
            return !this.deleteReason
        }
    },
    methods: {
        handleSortChange(param) {
            if (!param.order) {
                return
            }
            this.listParams.sort_condition = param.prop
            this.listParams.sort_type =
                param.order === 'ascending' ? 'asc' : 'desc'
            this.getActivityList()
        },
        getActivityList(page) {
            if (page) {
                this.listParams.page = page
            }
            this.listLoading = true
            this.$store
                .dispatch('SquareManage/activityList', this.listParams)
                .then(response => {
                    console.log(response.msg)
                    this.listLoading = false
                })
                .catch(error => {
                    console.log(error)
                    this.listLoading = false
                })
        },
        handleFilterChange(filters) {
            if (
                filters.status.length === 0 &&
                this.listParams.status !== 'all'
            ) {
                this.listParams.status = 'all'
                this.getActivityList()
            } else if (
                filters.status.length === 1 &&
                this.listParams.status !== filters.status[0]
            ) {
                this.listParams.status = filters.status[0]
                this.getActivityList()
            }
        }
    },
    data() {
        return {
            Consts: Consts,
            listLoading: true,
            listParams: initListParams()
        }
    }
}
</script>
