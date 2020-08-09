<template>
    <div>
        <el-dialog title="冻结用户" :visible.sync="freeze.show" width="250px" append-to-body>
            <el-select v-model="freeze.reason" placeholder="请选择冻结理由">
                <el-option
                    v-for="(reason, id) in Consts.freezeReasons"
                    :key="id"
                    :label="reason"
                    :value="id"
                ></el-option>
            </el-select>
            <el-select v-model="freeze.time" placeholder="请选择冻结时间">
                <el-option
                    v-for="(time, id) in Consts.freezeTime"
                    :key="id"
                    :label="time"
                    :disabled="time.disable"
                    :value="id"
                ></el-option>
            </el-select>
            <div slot="footer" class="dialog-footer">
                <el-button @click="freeze.show = false">取 消</el-button>
                <el-button
                    :loading="freeze.loading"
                    type="primary"
                    @click="handleFreezeUser"
                    :disabled="freeze.reason ? false : true"
                >确 定</el-button>
            </div>
        </el-dialog>
        <el-button
            size="mini"
            type="primary"
            round
            :disabled="userInfo.phone ? false : true"
            @click="handleResetUser"
            v-text="'重置密码'"
        ></el-button>
        <el-button
            size="mini"
            type="warning"
            round
            :loading="freeze.loading"
            @click="handleFreezeClick"
            v-text="isFreezed ? '解冻账户' : '冻结账户'"
        ></el-button>
    </div>
</template>

<script>
import Consts from '@/config/const'
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
    name: 'UserOptions',
    props: {
        userInfo: {
            type: Object,
            required: true
        },
        tableIndex: {
            type: Number,
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
    data() {
        return {
            freeze: {
                show: false,
                loading: false,
                reason: undefined
            },
            reset: {
                loading: false
            },
            Consts: Consts
        }
    },
    methods: {
        // 重置用户密码
        handleResetUser() {
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
                        .dispatch('UserManage/resetUser', {
                            uid: this.userInfo.id
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
        handleFreezeUser() {
            if (this.freeze.reason) {
                // console.log('aaa')
                this.freeze.loading = true
                this.$store
                    .dispatch('UserManage/freezeUser', {
                        tableIndex: this.tableIndex >= 0 ? this.tableIndex : -1,
                        params: {
                            freeze_reason: this.freeze.reason,
                            freeze_time: this.freeze.time,
                            uid: this.userInfo.id
                        }
                    })
                    .then(response => {
                        this.$message({
                            message: response.msg,
                            type: 'success'
                        })
                        this.freeze.loading = false
                        this.freeze.show = false
                        this.freeze.reason = undefined
                    })
                    .catch(() => {
                        this.freeze.loading = false
                    })
            }
        },
        handleUnfreezeUser() {
            if (this.isFreezed) {
                this.freeze.loading = true
                this.$store
                    .dispatch('UserManage/unfreezeUser', {
                        tableIndex: this.tableIndex >= 0 ? this.tableIndex : -1,
                        params: {
                            uid: this.userInfo.id
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
            }
        },
        // 点击冻结/解冻按钮
        handleFreezeClick() {
            if (this.isFreezed) {
                this.handleUnfreezeUser()
            } else {
                this.freeze.show = true
            }
        }
    }
}
</script>
