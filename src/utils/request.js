// 封装基于axios的网络请求模块
import axios from 'axios'
import { getToken } from './localStorage'
// 创建axios的实例
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net',
  timeout: 5000
})
// 请求拦截器
request.interceptors.request.use(config => {
  // 统一(除了第一次登录以外)设置请求头token令牌
  setTimeout(() => {
    const token = getToken('token')
    if (token) {
      config.headers.Authorization = token
    }
  }, 500)
  return config
})
// 响应拦截器
request.interceptors.response.use(res => {
  return res.data
})

export default request
