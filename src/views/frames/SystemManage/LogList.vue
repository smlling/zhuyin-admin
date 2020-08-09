<template>
    <div style="height: 100%">
        <el-table
            v-loading="listLoading"
            :data="logList.list"
            height="95%"
            stripe
            max-height="100%"
            style="width: 100%"
            tooltip-effect="dark"
            highlight-current-row
            @sort-change="handleSortChange"
        >
            <el-table-column align="center" label="ID" prop="id"></el-table-column>
            <el-table-column align="center" label="管理员" prop="admin" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="操作" prop="action" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="时间" prop="time" show-overflow-tooltip sortable></el-table-column>
            <el-table-column align="center" label="IP地址" prop="ip" show-overflow-tooltip></el-table-column>
        </el-table>
        <div style="display: flex">
            <el-pagination
                hide-on-single-page
                background
                layout="prev, pager, next"
                :page-size="logList.limit"
                :page-count="logList.total_page"
                :current-page="logList.page"
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
        if (this.$route.query.admin) {
            this.listParams.admin = this.$route.query.admin
        }

        this.getData()
    },
    watch: {
        // 监听路由变化
        $route(to, from) {
            if (to.query.admin) {
                this.listParams.admin = to.query.admin
            }

            this.getData()
        }
    },
    computed: {
        ...mapGetters({
            logList: 'logList',
            adminInfo: 'adminInfo'
        })
    },
    methods: {
        handleSortChange(param) {
            console.log(param)
            if (!param.order) {
                return
            }
            // this.listParams.sort_condition = param.prop
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
                    .dispatch('SystemManage/logList', this.listParams)
                    .then(response => {
                        console.log(response.msg)
                        this.listLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.listLoading = false
                    })
            }
        }
    },
    data() {
        return {
            Consts: Consts,
            listParams: {
                limit: 20,
                page: 1,
                admin: '',
                sort_type: 'desc'
            },
            listLoading: true
        }
    }
}
</script>
