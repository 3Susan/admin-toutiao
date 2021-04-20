import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/localStorage'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Article from '@/views/article'
import Pulish from '@/views/pulish'
import Image from '@/views/image'
import Comment from '@/views/comment'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // name: 'layout',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      },
      {
        path: '/pulish',
        name: 'pulish',
        component: Pulish
      },
      {
        path: '/image',
        name: 'image',
        component: Image
      },
      {
        path: '/comment',
        name: 'comment',
        component: Comment
      }
    ]
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局前置守卫: 在准备跳转到某个路由组件之前 (在开发中用的比较多)
router.beforeEach((to, from, next) => { // before enter each route component
  if (to.path !== '/login') { // 如果是去登录页面放行 不是的话进入if
    const token = getToken('token') // 判断是否有token
    if (token) {
      next()
    } else {
      // router.push('/login') // 没有token去login页面登录
      next({ path: '/login' })
    }
  } else {
    next() // 放行
  }
})
/* 说明:
    ①. to: 目标route
    ②. from: 起始route
    ③. next: 函数
        next(): 执行下一个守卫回调, 如果没有跳转到目标路由
        next(false)/不执行: 跳转流程在当前处中断, 不会跳转到目标路由组件
        next(path): 跳转到指定的另一个路由 */

export default router
