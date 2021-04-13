// 关于本地存储模块
// 保存请求token函数
export const setToken = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value))
}
// 获取请求token函数
export const getToken = (key) => {
  return JSON.parse(localStorage.getItem(key))
}
// 移除请求token函数
export const removeToken = (key) => {
  return localStorage.removeItem(key)
}
