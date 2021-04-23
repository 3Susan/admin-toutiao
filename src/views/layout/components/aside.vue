<template>
  <div class=''>
    <!-- <div class="aside-bg">
      <img src="../assets/logo_admin.png" alt="">
    </div> -->
    <el-menu
      :default-active='$route.path'
      class="el-menu-vertical-demo"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
      >
      <el-menu-item index="/">
        <!-- <i class="el-icon-menu"></i> -->
        <i class="iconfont iconshouye"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <!-- <i class="el-icon-document"></i> -->
        <i class="iconfont iconarticle"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/image">
        <!-- <i class="el-icon-setting"></i> -->
        <i class="iconfont iconimg"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/pulish">
        <!-- <i class="el-icon-setting"></i> -->
        <i class="iconfont iconpublish"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/comment">
        <!-- <i class="el-icon-menu"></i> -->
        <i class="iconfont iconcomment"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/fans">
        <!-- <i class="el-icon-document"></i> -->
        <i class="iconfont iconfans"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="/setting">
        <i class="iconfont iconsetting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
    }
  },
  props: {
    isCollapse: Boolean
  },
  components: { },
  methods: {
  }
}
</script>
<style lang='less' scoped>
.aside-body {
  background-color: #002033 !important;
  .aside-bg {
    display: none;
    // background: url("../assets/logo_admin.png");
    height: 60px;
    width: 182px;
    background-color: #002033;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 40px;
      width: 159px;
    }
  }
}

.iconfont {
  height: 18px;
  width: 18px;
  margin-right: 10px;
  padding-left: 5px;
}
</style>
