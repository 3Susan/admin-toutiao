import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/styles/index.less'
// 引入全局样式文件
Vue.config.productionTip = false // 禁止生产环境提示
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
