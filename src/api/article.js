// 关于文章请求
import request from '@/utils/request'
// 获取文章列表
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}
// 获取频道列表
export const getChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}
// 删除指定文章
export const deleteAeticleInfo = (target) => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${target}`
  })
}
