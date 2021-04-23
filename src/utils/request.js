// 封装基于axios的网络请求模块
import axios from 'axios'
import JSONbig from 'json-bigint'
import { getToken } from './localStorage'
import { Message } from 'element-ui'
import router from '@/router/index'
// 创建axios的实例
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net',
  timeout: 5000,
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    // 有可能传入的id过大，导致响应数据格式化
    // 解决：引入jsonbig这个包转化data数据,但是在使用时候toString()
    // 有的数据正常 直接return data
    try {
      return JSONbig.parse(data)
    } catch (error) {
      return data
    }
  }]
})
// 请求拦截器
request.interceptors.request.use(config => {
  // 统一(除了第一次登录以外)设置请求头token令牌
  const token = getToken('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
// 响应拦截器
request.interceptors.response.use(response => {
  // 成功走这里
  return response.data
}, error => {
  // 失败
  const status = error.response.status
  if (status === 401) {
    Message('登录已过期，请重新登录')
    window.localStorage.removeItem('token')
    setTimeout(() => {
      router.push({
        path: '/login'
      })
    }, 500)
  } else if (status === 403) {
    Message('没有权限进行操作，请更换用户')
    Message('登录已过期，请重新登录')
    window.localStorage.removeItem('token')
    setTimeout(() => {
      router.push({
        path: '/login'
      })
    }, 500)
  } else if (status === 404) {
    Message('参数或者路径错误，请稍后重试')
  } else if (status === 500) {
    Message.error('服务器内部错误，稍后重试')
  }
  return Promise.reject(error)
})

export default request
