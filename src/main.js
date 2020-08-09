// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'

import '@/icons' // icon
import '@/components'

import ImagePreview from 'image-preview-full'
import 'image-preview-full/lib/image-preview-full.css'

Vue.use(ImagePreview)

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
