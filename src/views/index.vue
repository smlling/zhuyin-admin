<template>
    <div id="view" v-if="isLogin">
        <el-dialog title="个人信息" :visible.sync="showInfoDialog" width="350px" center>
            <el-form label-position="left" label-width="100px" :model="adminInfo">
                <el-form-item label="ID">
                    <el-input disabled :placeholder="adminInfo.id"></el-input>
                </el-form-item>
                <el-form-item label="身份">
                    <el-input disabled :placeholder="adminInfo.role"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input disabled :placeholder="adminInfo.username"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input
                        v-model="nicknameChange.nickname"
                        :placeholder="adminInfo.nickname"
                        tabindex="1"
                        @keyup.enter.native="handleChangeNickname"
                    ></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input disabled v-model="adminInfo.email"></el-input>
                </el-form-item>
                <el-form-item label="手机">
                    <el-input disabled v-model="adminInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="上次登陆时间">
                    <el-input disabled :placeholder="adminInfo.last_login_time"></el-input>
                </el-form-item>
                <el-form-item label="上次登陆IP" v-if="adminInfo.last_login_ip">
                    <el-input disabled :placeholder="adminInfo.last_login_ip"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showInfoDialog = false">取 消</el-button>
                <el-button
                    :loading="nicknameChange.loading"
                    type="primary"
                    :disabled="nicknameChange.nickname ? false : true"
                    @click="handleChangeNickname"
                >确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改密码" :visible.sync="changePassword.show" width="350px" center>
            <el-form label-position="left" label-width="100px">
                <el-form-item label="旧密码">
                    <el-input
                        v-model="changePassword.oldPassword"
                        :type="changePassword.passwordType.old"
                        placeholder="旧密码"
                        tabindex="1"
                    />
                    <span class="show-pwd" @click="showPwd('old')">
                        <svg-icon
                            :icon-class="changePassword.passwordType.old === 'password' ? 'eye' : 'eye-open'"
                        />
                    </span>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input
                        v-model="changePassword.newPassword"
                        :type="changePassword.passwordType.new"
                        placeholder="新密码"
                        tabindex="2"
                    />
                    <span class="show-pwd" @click="showPwd('new')">
                        <svg-icon
                            :icon-class="changePassword.passwordType.new === 'password' ? 'eye' : 'eye-open'"
                        />
                    </span>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input
                        v-model="changePassword.newPasswordConfirm"
                        :type="changePassword.passwordType.confirm"
                        placeholder="确认密码"
                        tabindex="3"
                        @keyup.enter.native="handleChangePassword"
                    />
                    <span class="show-pwd" @click="showPwd('confirm')">
                        <svg-icon
                            :icon-class="changePassword.passwordType.confirm === 'password' ? 'eye' : 'eye-open'"
                        />
                    </span>
                </el-form-item>
            </el-form>
            <div></div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="changePassword.show = false">取 消</el-button>
                <el-button
                    :loading="changePassword.loading"
                    type="primary"
                    :disabled="(changePassword.newPassword === changePassword.newPasswordConfirm) ? false : true"
                    @click="handleChangePassword"
                >确 定</el-button>
            </div>
        </el-dialog>
        <keep-alive>
            <el-header :style="globalHeaderStyle">
                <img id="logo" src="../assets/logo.png" style="height: 100%" />
                <div :style="loginUserStyle">
                    <el-dropdown @command="handleCommand">
                        <i class="el-icon-s-home" style="margin-right: 15px"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="detail">个人信息</el-dropdown-item>
                            <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
                            <el-dropdown-item command="logout">注销登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span>{{ adminInfo.nickname }}</span>
                </div>
            </el-header>
        </keep-alive>
        <el-container style="height: 95%; border: 1px solid #eee">
            <keep-alive>
                <el-aside width="150px" style="background-color: rgb(238, 241, 246);color: #333">
                    <el-menu
                        :default-active="pathChain[pathChain.length-1].path"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        style="width: 100%;overflow: hidden;"
                        active-text-color="#2792C3"
                        unique-opened
                        @select="handleSelect"
                    >
                        <el-submenu
                            v-for="(menuGroup,route) in menuConfig"
                            :index="route"
                            :key="route"
                        >
                            <template slot="title">
                                <i :class="menuGroup.icon"></i>
                                {{ menuGroup.name }}
                            </template>
                            <el-menu-item-group
                                v-for="(frame,route) in menuGroup.frames"
                                :key="route"
                            >
                                <div v-if="!frame.superadmin || adminInfo.role === 'superadmin'">
                                    <el-menu-item :index="route">{{ frame.name }}</el-menu-item>
                                </div>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                    <footer :style="footerStyle">
                        2020©️主音
                        <br />All rights reserved.
                    </footer>
                </el-aside>
            </keep-alive>
            <el-container style="overflow-x: hidden">
                <el-header :style="breadcrumbHeaderStyle">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item>后台管理</el-breadcrumb-item>
                        <el-breadcrumb-item
                            v-for="index in pathChain"
                            :key="index.path"
                        >{{ index.name }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-header>

                <router-view v-if="adminInfo" />
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import MenuConfig from '@/config/sidemenu'
import { mapGetters } from 'vuex'
import Consts from '@/config/const'

// const initAdminInfoForm = () => {
//   return {
//     nickname: this.adminInfo.nickname,
//     email: this.adminInfo.email,
//     phone: this.adminInfo.phone
//   }
// }

export default {
    name: 'page-view',

    created: function() {
        // 初始化路由链
        var routeArray = this.$route.path.split('/').splice(1)
        this.updatePathChain(routeArray)
        // 检查登录状态
        if (!getToken()) {
            this.$router.push({
                path: '/login'
            })
        } else {
            this.isLogin = true
            this.$store
                .dispatch('Home/getInfo')
                .then(response => {
                    console.log(response.msg)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    watch: {
        // 监听路由变化
        $route(to, from) {
            var routeArray = to.path.split('/').splice(1)
            this.updatePathChain(routeArray)
            // console.log('触发watch')
        }
    },
    computed: {
        ...mapGetters({
            adminInfo: 'adminInfo'
        })
    },
    methods: {
        showPwd(index) {
            if (this.changePassword.passwordType[index] === 'password') {
                this.changePassword.passwordType[index] = ''
            } else {
                this.changePassword.passwordType[index] = 'password'
            }
        },
        handleSelect(index, indexPath) {
            // console.log('触发select')
            // 跳转路由
            this.$router.push(this.updatePathChain(indexPath))
        },
        handleOpen(key, keyPath) {
            // console.log(key, keyPath)
            //   this.currentMenu = key
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath)
        },
        handleCommand(command) {
            console.log(command)
            if (command === 'logout') {
                this.$store
                    .dispatch('Home/logout')
                    .then(response => {
                        location.reload()
                        console.log(response.msg)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            } else if (command === 'detail') {
                this.showInfoDialog = true
            } else if (command === 'changePwd') {
                this.changePassword.show = true
            }
        },
        updatePathChain(indexPath = []) {
            if (indexPath === []) {
                return
            }
            // console.log(this.indexPath)
            // 清空原链
            this.pathChain.length = 0
            // 路由表达式
            var go = ''
            // 导入导航栏配置信息
            var menuConfig = this.menuConfig
            // 路径遍历
            indexPath.forEach(path => {
                if (!menuConfig) {
                    return
                }
                go += '/' + path
                var tmp = { path: path, name: menuConfig[path].name }
                this.pathChain.push(tmp)
                menuConfig = menuConfig[path].frames || {}
                // console.log(menuConfig)
            })
            return go
        },
        handleChangeNickname() {
            this.nicknameChange.loading = true
            this.$store
                .dispatch('Home/changeNickname', {
                    nickname: this.nicknameChange.nickname
                })
                .then(response => {
                    this.nicknameChange.loading = false
                    this.nicknameChange.nickname = undefined
                    this.showInfoDialog = false
                    this.$message({
                        message: response.msg,
                        type: 'success'
                    })
                })
                .catch(error => {
                    this.nicknameChange.loading = false
                    console.log(error)
                })
        },
        handleChangePassword() {
            this.changePassword.loading = true
            this.$store
                .dispatch('Home/changePassword', {
                    old_password: this.changePassword.oldPassword,
                    new_password: this.changePassword.newPassword
                })
                .then(response => {
                    this.changePassword.loading = false
                    this.changePassword.oldPassword = undefined
                    this.changePassword.newPassword = undefined
                    this.changePassword.newPasswordConfirm = undefined
                    this.changePassword.show = false
                    this.$message({
                        message: response.msg,
                        type: 'success'
                    })
                    // 密码更改成功后需要重新登录
                    this.$store.dispatch('Home/resetToken').then(() => {
                        this.$router.push('/login')
                    })
                })
                .catch(error => {
                    this.changePassword.loading = false
                    console.log(error)
                })
        }
    },
    data() {
        return {
            isLogin: false,
            showInfoDialog: false,
            // 用于面包屑的的路径链
            pathChain: [],
            Consts: Consts,
            menuConfig: MenuConfig,
            nicknameChange: {
                nickname: undefined,
                loading: false
            },
            changePassword: {
                show: false,
                loading: false,
                oldPassword: undefined,
                newPassword: undefined,
                newPasswordConfirm: undefined,
                passwordType: {
                    old: 'password',
                    new: 'password',
                    confirm: 'password'
                }
            },
            globalHeaderStyle: {
                height: '5%',
                display: 'flex',
                alignItems: 'center'
            },
            breadcrumbHeaderStyle: {
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#fff',
                color: '#333',
                lineHeight: '60px',
                minWidth: '300px'
            },
            footerStyle: {
                position: 'absolute',
                width: '150px',
                textAlign: 'center',
                bottom: '0px',
                fontSize: '10px'
            },
            loginUserStyle: {
                right: '10px',
                textAlign: 'right',
                fontSize: '12px',
                position: 'absolute'
            }
        }
    }
}
</script>

<style lang="scss">
.show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
}
</style>
