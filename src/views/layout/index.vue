<template>
  <div>
    <el-container class="aside layout-container"  >
      <el-aside width="auto" class="aside">
        <Aside class="aside-body" :isCollapse="isCollapse"/>
      </el-aside>
      <el-container>
        <el-header  class="header">
          <Header :handleAside="handleAside"/>
        </el-header>
        <el-main  class="home">
         <!-- 子路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Aside from './components/aside'
import Header from './components/header'
export default {
  name: 'layoutIndex',
  data () {
    return {
      isCollapse: false
    }
  },
  components: { Aside, Header },
  methods: {
    handleAside (isCollapse) {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style lang='less' scoped>
.layout-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.aside {
  .aside-body {
    height: 100%;
  }
}
.home {
  background-color: pink;
}
</style>
