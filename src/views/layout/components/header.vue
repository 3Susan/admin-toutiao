<template>
  <div class='header-contanier'>
    <div class="left">
      <i
      :class="{'el-icon-s-fold':!isShow,'el-icon-s-unfold':isShow}"
      @click="isShowAside"></i>
      <span>sus43n科技有限公司</span>
    </div>
    <div class="right">
      <img width="40px" height="40px" src="../assets/susa3n.jpg" alt="用户头像">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人  profile</el-dropdown-item>
          <el-dropdown-item @click.native="quitUser">退出  quit</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { getUserProfile } from '@/api/login'
import { getToken, removeToken } from '@/utils/localStorage'
export default {
  name: '',
  data () {
    return {
      user: {},
      isShow: ''
    }
  },
  components: { },
  props: {
    handleAside: Function
  },
  created () {
    // 延迟获取用户信息
    this.loadingUserProfile()
  },
  methods: {
    handleCommand (command) {
      this.$message('click on item ' + command)
    },
    // 获取用户信息
    loadingUserProfile () {
      const token = getToken('token') // 第一次登录保存用户的token
      console.log(token)
      getUserProfile(token).then(res => {
        this.user = res.data
      })
    },
    // 用于切换控制图标并控制aside的isCollapse布尔值
    isShowAside (isCollapse) {
      this.isShow = isCollapse // 获取兄弟组件内控制图标用来更换icon
      this.handleAside()
    },
    quitUser () {
      // 退出提示
      this.$confirm('确认退出当前用户？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$message({
            type: 'info',
            message: '退出成功'
          })
          removeToken('token') // 移除token
          this.$router.push('/login') // 跳转到登录页面
        })
        .catch(action => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
}
</script>
<style lang='less' scoped>
.header-contanier {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  .left {
    font-size: 25px;
    color: rgba(96, 98, 125);
    i {
      margin-right: 10px;
    }
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
