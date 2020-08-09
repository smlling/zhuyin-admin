<template>
    <router-view />
</template>

<script>
import setting from '@/config/setting'
import Vue from 'vue'

export default {
    name: 'App',
    created: function() {
        Vue.prototype.$conf = setting // 将全局变量模块挂载到Vue.prototype中
    }
}
</script>
