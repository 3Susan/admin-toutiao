// 关于处理请求的api
import request from '@/utils/request'
// 处理图片  将富文本编辑器如果上传本地图片，会转换base64格式
// 导致文件内容过大，需要将长内容转为img的url连接
// 一般文件上传的接口i偶都要把请求头中的Content-Type 设置为multipart/form-data
// 但是axios上传文件不要手动设置，只要给data一个FormData对象即可
// FormData函数用来处理文件（上传）相关
export const handleImage = data => {
  return request({
    url: '/mp/v1_0/user/images',
    method: 'POST',
    data
  })
}
// 获取所有的图片素材
export const getAllImage = (params) => {
  return request({
    url: '/mp/v1_0/user/images',
    method: 'GET',
    params
  })
}
