<template>
    <div style="height: 100%">
        <el-table
            v-loading="listLoading"
            :data="userList.list"
            height="95%"
            stripe
            max-height="100%"
            style="width: 100%"
            tooltip-effect="dark"
            highlight-current-row
            @sort-change="handleSortChange"
            @filter-change="handleFilterChange"
        >
            <el-table-column align="center" label="UID" prop="id"></el-table-column>
            <el-table-column align="center" label="头像" prop="avatar">
                <template slot-scope="scope">
                    <div class="block">
                        <el-avatar :size="50" :src="scope.row.avatar.small"></el-avatar>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="用户名"
                prop="username"
                show-overflow-tooltip
                sortable
            ></el-table-column>
            <el-table-column align="center" label="昵称" prop="nickname" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="个人描述" prop="description" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="社交账户">
                <template slot-scope="scope">
                    <user-social-accounts :userInfo="scope.row"></user-social-accounts>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="上次登录时间"
                prop="last_login_time"
                show-overflow-tooltip
                sortable
            ></el-table-column>
            <el-table-column
                align="center"
                label="注册时间"
                prop="register_time"
                show-overflow-tooltip
                sortable
            ></el-table-column>
            <el-table-column align="center" label="动态数量" prop="post_activity_count_all" sortable>
                <template slot-scope="scope">
                    <el-tag
                        style="cursor: pointer"
                        type="success"
                        @click="$router.push({
                path: '/SquareManage/ActivityManage?uid=' + scope.row.id
            })"
                    >{{ scope.row.post_activity_count_all }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="评论数量"
                prop="post_comment_count_all"
                sortable="custom"
            >
                <template slot-scope="scope">
                    <el-tag
                        style="cursor: pointer"
                        type="success"
                        @click="$router.push({
                path: '/SquareManage/CommentManage?uid=' + scope.row.id
            })"
                    >{{ scope.row.post_comment_count_all }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="状态"
                :filters="[{ text: '正常', value: 'available' }, { text: '冻结', value: 'freezed' }, { text: '注销', value: 'abandon' }]"
                :filter-multiple="false"
                column-key="status"
            >
                <template slot-scope="scope">
                    <user-status :userInfo="scope.row"></user-status>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <user-options :userInfo="scope.row" :tableIndex="scope.$index"></user-options>
                </template>
            </el-table-column>
        </el-table>
        <div style="display: flex">
            <el-pagination
                hide-on-single-page
                background
                layout="prev, pager, next"
                :page-size="userList.limit"
                :page-count="userList.total_page"
                :current-page="userList.page"
                @current-change="getUserList"
                style="margin: auto"
            ></el-pagination>
        </div>
    </div>
</template>

<style>
</style>

<script>
import Consts from '@/config/const'
import { mapGetters } from 'vuex'

export default {
    created: function() {
        if (this.$route.query.uid) {
            this.listParams.uid = this.$route.query.uid
        } else if (this.$route.query.status) {
            this.listParams.status = this.$route.query.status
        }

        this.getUserList()
    },
    watch: {
        // 监听路由变化
        $route(to, from) {
            if (to.query.uid > 0) {
                this.listParams.uid = to.query.uid
            }

            this.getUserList()
        }
    },
    computed: {
        ...mapGetters({
            userList: 'userList'
        }),
        disableFreezeConfirm: function() {
            return !(
                this.freezeUserForm.freeze_reason &&
                this.freezeUserForm.freeze_time
            )
        },
        disableAddConfirm: function() {
            return !(this.addUserForm.username && this.addUserForm.password)
        }
    },
    methods: {
        handleSortChange(param) {
            console.log(param)
            if (!param.order) {
                return
            }
            this.listParams.sort_condition = param.prop
            this.listParams.sort_type =
                param.order === 'ascending' ? 'asc' : 'desc'
            this.getUserList()
        },
        handleFilterChange(filters) {
            if (
                filters.status.length === 0 &&
                this.listParams.status !== 'all'
            ) {
                this.listParams.status = 'all'
                this.getUserList()
            } else if (
                filters.status.length === 1 &&
                this.listParams.status !== filters.status[0]
            ) {
                this.listParams.status = filters.status[0]
                this.getUserList()
            }
        },
        getUserList(page) {
            if (page) {
                this.listParams.page = page
            }
            this.listLoading = true
            this.$store
                .dispatch('UserManage/UserList', this.listParams)
                .then(response => {
                    console.log(response.msg)
                    this.listLoading = false
                })
                .catch(error => {
                    console.log(error)
                    this.listLoading = false
                })
        }
    },
    data() {
        return {
            Consts: Consts,
            listParams: {
                limit: 20,
                page: 1,
                status: 'all',
                uid: 0,
                sort_condition: 'register_time',
                sort_type: 'desc'
            },
            listLoading: true
        }
    }
}
</script>
