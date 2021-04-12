import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import '@/styles/index.less' // 引入全局样式文件
import 'element-ui/lib/theme-chalk/index.css' // 引入elementUI组件库的样式
Vue.use(ElementUI) // 全局注册ElementUI组件库

Vue.config.productionTip = false // 禁止生产环境提示
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
