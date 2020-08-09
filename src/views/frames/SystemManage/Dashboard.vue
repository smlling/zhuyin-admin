<template>
    <div>
        <el-row :gutter="50" style="margin-left:20px">
            <el-col :span="8">
                <div
                    class="grid-content bg-purple"
                    @click="clickHandle('/UserManage/UserList?status=available')"
                >
                    <el-card shadow="hover" style="cursor: pointer">
                        正常用户数量:
                        {{ dashboard.user.available }}
                    </el-card>
                </div>
            </el-col>
            <el-col :span="8">
                <div
                    class="grid-content bg-purple"
                    @click="clickHandle('/UserManage/UserList?status=freezed')"
                >
                    <el-card shadow="hover" style="cursor: pointer">
                        冻结用户数量:
                        {{ dashboard.user.freezed }}
                    </el-card>
                </div>
            </el-col>
            <el-col :span="8">
                <div
                    class="grid-content bg-purple"
                    @click="clickHandle('/UserManage/UserList?status=abandon')"
                >
                    <el-card shadow="hover" style="cursor: pointer">
                        注销用户数量:
                        {{ dashboard.user.abandon }}
                    </el-card>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="50" style="margin-left:20px">
            <el-col :span="8">
                <div
                    class="grid-content bg-purple"
                    @click="clickHandle('/SquareManage/ActivityManage?status=available')"
                >
                    <el-card shadow="hover" style="cursor: pointer">
                        公开动态数量:
                        {{ dashboard.square_activity.available }}
                    </el-card>
                </div>
            </el-col>
            <el-col :span="8">
                <div
                    class="grid-content bg-purple"
                    @click="clickHandle('/SquareManage/ActivityManage?status=private')"
                >
                    <el-card shadow="hover" style="cursor: pointer">
                        隐私动态数量:
                        {{ dashboard.square_activity.private }}
                    </el-card>
                </div>
            </el-col>
            <el-col :span="8">
                <div
                    class="grid-content bg-purple"
                    @click="clickHandle('/SquareManage/ActivityManage?status=delete')"
                >
                    <el-card shadow="hover" style="cursor: pointer">
                        删除动态数量:
                        {{ dashboard.square_activity.delete }}
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Dashboard',
    created: function() {
        this.$store
            .dispatch('SystemStatus/dashboard')
            .then(response => {
                console.log(response.msg)
            })
            .catch(error => {
                console.log(error)
            })
    },
    computed: {
        ...mapGetters({
            dashboard: 'dashboard'
        })
    },
    watch: {},
    methods: {
        clickHandle(goRoute) {
            this.$router.push({ path: goRoute })
        }
    },
    data() {
        return {}
    }
}
</script>

<style lang='scss'>
.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}
.bg-purple-dark {
    background: #99a9bf;
}
.bg-purple {
    background: #d3dce6;
}
.bg-purple-light {
    background: #e5e9f2;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>
