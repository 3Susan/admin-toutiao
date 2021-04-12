// 封装基于axios的网络请求模块
import axios from 'axios'
// 创建axios的实例
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net',
  timeout: 5000
})
// 请求拦截器
request.interceptors.request.use = function (config) {
  return config
}
// 响应拦截器
request.interceptors.response.use = function (res) {
  return res
}

export default request
