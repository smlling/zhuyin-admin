import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Consts from '@/config/const'

// 创建axios实例
const service = axios.create({
    //   baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    baseURL: Consts.adminApiUrl,
    withCredentials: true, // send cookies when cross-domain requests
    crossDomain: true,
    timeout: 10000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // do something before request is sent

        let token = getToken()
        if (token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['Authorization'] = token
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
    */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data
        console.log('网络请求响应：')
        console.log(res)
        if (response.headers['content-type'] === 'app/json; charset=utf-8' && !res.success) {
            Message({
                message: res.msg || '请求错误',
                type: 'error',
                duration: 5 * 1000
            })

            if (res.status_code === 1003 || res.status_code === 1010 || res.status_code === 1002) {
                // token失效
                MessageBox.alert('当前登录身份已失效，请重新登录', '温馨提示', {
                    type: 'error'
                }).then(() => {
                    store.dispatch('Home/resetToken').then(() => {
                        location.reload()
                    })
                })
            }
            return Promise.reject(res.msg || '请求错误')
        } else {
            return res
        }
    },
    error => {
        // console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
