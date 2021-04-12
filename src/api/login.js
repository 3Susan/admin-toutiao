import request from '@/utils/request'
export function loginUser (user) {
  return request({
    url: '/mp/v1_0/authorizations',
    method: 'POST',
    data: user // 请求体函数
  })
}
