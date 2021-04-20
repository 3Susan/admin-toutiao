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
// 发表文章内容
export const pulishArticleInfo = (data, draft1) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    data,
    params: {
      draft: draft1
    }
  })
}
// 获取指定文章内容
export const getArticleInfo = id => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${id}`
  })
}
// 编辑指定文章内容
export const editArticleInfo = (id, data, draft1) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${id}`,
    data,
    params: {
      draft: draft1
    }
  })
}
// 修改对评论的状态
export const editCommentStatus = (articleId, status) => {
  return request({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    data: {
      allow_comment: status
    },
    params: {
      article_id: articleId
    }
  })
}
