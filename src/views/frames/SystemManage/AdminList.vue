<template>
    <div style="height: 100%">
        <el-dialog title="冻结用户" :visible.sync="freeze.show" width="250px" append-to-body>
            <el-select v-model="freeze.params.reason" placeholder="请选择冻结理由">
                <el-option
                    v-for="(reason, id) in Consts.freezeReasonsAdmin"
                    :key="id"
                    :label="reason"
                    :value="id"
                ></el-option>
            </el-select>
            <div slot="footer" class="dialog-footer">
                <el-button @click="freeze.show = false">取 消</el-button>
                <el-button
                    :loading="freeze.loading"
                    type="primary"
                    @click="handleFreeze"
                    :disabled="freeze.params.reason ? false : true"
                >确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加管理员" :visible.sync="add.show" width="250px" append-to-body>
            <el-form label-position="left" label-width="100px">
                <el-input v-model="add.params.username" placeholder="用户名"></el-input>
                <el-input v-model="add.params.nickname" placeholder="昵称"></el-input>
                <el-input v-model="add.params.password" placeholder="密码"></el-input>
                <el-input v-model="add.params.phone" placeholder="手机号"></el-input>
                <el-input v-model="add.params.email" placeholder="邮箱"></el-input>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="add.show = false">取 消</el-button>
                <el-button :loading="add.loading" type="primary" @click="handleAdd">确 定</el-button>
            </div>
        </el-dialog>
        <el-table
            v-loading="listLoading"
            :data="adminList.list"
            height="95%"
            stripe
            max-height="100%"
            style="width: 100%"
            tooltip-effect="dark"
            highlight-current-row
            @sort-change="handleSortChange"
        >
            <el-table-column align="center" label="ID" prop="id"></el-table-column>
            <el-table-column
                align="center"
                label="用户名"
                prop="username"
                show-overflow-tooltip
                sortable
            ></el-table-column>
            <el-table-column align="center" label="身份" prop="role" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="昵称" prop="nickname" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="邮箱" prop="email" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="电话" prop="phone" show-overflow-tooltip></el-table-column>
            <el-table-column
                align="center"
                label="添加时间"
                prop="add_time"
                show-overflow-tooltip
                sortable
            ></el-table-column>
            <el-table-column
                align="center"
                label="上次登录时间"
                prop="last_login_time"
                show-overflow-tooltip
                sortable
            ></el-table-column>
            <el-table-column align="center" label="上次登录ip" prop="last_login_ip"></el-table-column>
            <el-table-column align="center" label="操作">
                <div slot="header">
                    <el-button size="mini" type="primary" @click="add.show = true" v-text="'添加管理员'"></el-button>
                </div>
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        round
                        @click="handleReset(scope.row.id)"
                        v-text="'重置密码'"
                    ></el-button>
                    <el-button
                        size="mini"
                        type="warning"
                        round
                        :loading="freeze.loading"
                        @click="handleFreezeClick(scope.$index, scope.row)"
                        v-text="scope.row.freeze_time ? '解冻账户' : '冻结账户'"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="display: flex">
            <el-pagination
                hide-on-single-page
                background
                layout="prev, pager, next"
                :page-size="adminList.limit"
                :page-count="adminList.total_page"
                :current-page="adminList.page"
                @current-change="getData"
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
        if (this.$route.query.id) {
            this.listParams.id = this.$route.query.id
        }

        this.getData()
    },
    watch: {
        // 监听路由变化
        $route(to, from) {
            if (to.query.id > 0) {
                this.listParams.id = to.query.id
            }

            this.getData()
        }
    },
    computed: {
        ...mapGetters({
            adminList: 'adminList',
            adminInfo: 'adminInfo'
        })
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
            this.getData()
        },
        getData(page) {
            if (page) {
                this.listParams.page = page
            }
            if (this.adminInfo.role !== 'superadmin') {
                this.$alert('权限不足', '警告', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$router.push({
                            path: '/'
                        })
                    }
                })
            } else {
                this.listLoading = true
                this.$store
                    .dispatch('SystemManage/adminList', this.listParams)
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
        // 重置用户密码
        handleReset(id) {
            this.$confirm(
                '此操作将重置该用户的密码, 操作无法撤回, 是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            )
                .then(() => {
                    this.reset.loading = true
                    this.$store
                        .dispatch('SystemManage/resetAdmin', {
                            id: id
                        })
                        .then(response => {
                            console.log(response.msg)
                            this.$message({
                                type: 'success',
                                message: response.msg
                            })
                            this.$alert(
                                '新密码: ' + response.data.new_password,
                                '用户密码重置成功'
                            )
                            this.reset.loading = false
                        })
                        .catch(error => {
                            console.log(error)
                            this.reset.loading = false
                        })
                })
                .catch(() => {
                    // this.$message({
                    //   type: 'info',
                    //   message: '已取消删除'
                    // })
                })
        },
        // 确定冻结用户
        handleFreeze() {
            if (this.freeze.params.reason) {
                // console.log('aaa')
                this.freeze.loading = true
                this.$store
                    .dispatch('SystemManage/freezeAdmin', {
                        tableIndex: this.tableIndex,
                        params: this.freeze.params
                    })
                    .then(response => {
                        this.$message({
                            message: response.msg,
                            type: 'success'
                        })
                        this.freeze.loading = false
                        this.freeze.show = false
                        this.freeze.params.reason = undefined
                        this.freeze.params.id = 0
                    })
                    .catch(() => {
                        this.freeze.loading = false
                    })
            }
        },
        handleUnfreeze(tableIndex, id) {
            this.freeze.loading = true
            this.$store
                .dispatch('SystemManage/unfreezeAdmin', {
                    tableIndex: tableIndex,
                    params: {
                        id: id
                    }
                })
                .then(response => {
                    this.$message({
                        message: response.msg,
                        type: 'success'
                    })
                    this.freeze.loading = false
                })
                .catch(error => {
                    console.log(error)
                    this.freeze.loading = false
                })
        },
        // 点击冻结/解冻按钮
        handleFreezeClick(tableIndex, adminInfo) {
            if (adminInfo.freeze_time) {
                this.this.handleUnfreeze(tableIndex, adminInfo.id)
            } else {
                this.tableIndex = tableIndex
                this.freeze.params.id = adminInfo.id
                this.freeze.show = true
            }
        },
        handleAdd() {
            this.$store
                .dispatch('SystemManage/addAdmin', this.add.params)
                .then(response => {
                    this.$message({
                        message: response.msg,
                        type: 'success'
                    })
                    this.add.loading = false
                    this.add.show = false
                    this.add.params.username = undefined
                    this.add.params.nickname = undefined
                    this.add.params.phone = undefined
                    this.add.params.email = undefined
                    this.add.params.password = undefined
                })
                .catch(error => {
                    console.log(error)
                    this.add.loading = false
                })
        }
    },
    data() {
        return {
            Consts: Consts,
            tableIndex: undefined,
            listParams: {
                limit: 20,
                page: 1,
                status: 'all',
                id: 0,
                sort_condition: 'add_time',
                sort_type: 'desc'
            },
            freeze: {
                show: false,
                loading: false,
                params: {
                    id: 0,
                    reason: undefined
                }
            },
            add: {
                show: false,
                loading: false,
                params: {
                    username: undefined,
                    nickname: undefined,
                    phone: undefined,
                    email: undefined,
                    password: undefined
                }
            },
            reset: {
                loading: false
            },
            listLoading: true
        }
    }
}
</script>
