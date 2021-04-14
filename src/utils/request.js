// 封装基于axios的网络请求模块
import axios from 'axios'
import JSONbig from 'json-bigint'
import { getToken } from './localStorage'
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
request.interceptors.response.use(res => {
  return res.data
})

export default request
