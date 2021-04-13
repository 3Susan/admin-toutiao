import request from '@/utils/request'
// 请求登录
export function loginUser (user) {
  return request({
    url: '/mp/v1_0/authorizations',
    method: 'POST',
    data: user // 请求体函数
  })
}
// 获取用户信息
export function getUserProfile (token) {
  return request({
    url: '/mp/v1_0/user/profile',
    method: 'GET',
    // 获取用户信息需要token令牌 设置请求头
    // Bearer空格token(必须有空格)
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
