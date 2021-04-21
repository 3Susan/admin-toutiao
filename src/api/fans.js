import request from '@/utils/request'
// 获取所有的粉丝列表
export const getAllFans = (params) => {
  return request({
    url: '/mp/v1_0/followers',
    method: 'GET',
    params
  })
}
