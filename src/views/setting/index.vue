<template>
  <div class='setting-container'>
   <el-card class="box-card" size="mini">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑 -->
      </div>
      <div>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form ref="form" :model="user" label-width="70px" size="mini">
              <el-form-item label="编号 :">
                <!-- <el-input v-model="user.id"></el-input> -->
                {{user.id}}
              </el-form-item>
              <el-form-item label="手机 :">
                {{user.mobile}}
              </el-form-item>
              <el-form-item label="媒体名称">
                <el-input v-model="user.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体名称">
                <el-input type="textarea" v-model="user.intro"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="user.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onEditUserProfile">保存</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="4" class="image-warp">
            <el-image
              style="height: 150px"
              src="http://localhost:8080/img/susa3n.074e6410.jpg"
              fit="cover"
            ></el-image>
            <p class="p-col" @click="changePhoto">点击修改头像</p>
            <input
              type="file"
              ref="file"
              hidden
              @change="onChangePhoto"
            >
          </el-col>
        </el-row>
        <!-- 弹出层 -->
        <el-dialog
          title="修改图片"
          :visible.sync="photoShow"
          :append-to-body="true"
          @opened="dialogEnd"
        >
          <div class="img-wrap">
            <img
              class="img"
              :src="previewImage"
              ref="previewImg"
            />
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        <!-- /弹出层 -->
      </div>
   </el-card>
  </div>
</template>
<script>
import { getUserProfile, editUserProfile } from '@/api/login'
import Cropper from 'cropperjs'
export default {
  name: 'settingIndex',
  data () {
    return {
      user: {},
      photoShow: false,
      previewImage: null
    }
  },
  components: { },
  mounted () {
    getUserProfile().then(res => {
      this.user = res.data
    })
  },
  methods: {
    onEditUserProfile () {
      const { name, intro, email } = this.user
      editUserProfile({
        name,
        intro,
        email
      }).then(res => {
        console.log(res)
        this.$bus.$emit('editUserName', res.data.name)
      })
    },
    changePhoto () {
      this.$refs.file.click()
    },
    onChangePhoto () {
      // 得到文件
      const file = this.$refs.file // 得到当前标签
      const files = file.files[0] // 得到上传的图片信息
      this.previewImage = window.URL.createObjectURL(files) // 将文件转为url地址
      // 展示弹出层预览图片
      this.photoShow = true
      // 图片裁剪器必须基于img初始化
      // 注意：img必须时可见状态才能正常初始化
      // 此时img还是弹出层呢， 弹出层打开时结束时绑定回调函数
      // 初始化图片裁切器

      // 解决 选择相同文件时，也会触发此事件
      this.$refs.file.value = ''
    },
    dialogEnd () { // 弹出层打开时结束时回调函数
      const image = this.$refs.previewImg
      const cropper = new Cropper(image, {
        aspectRatio: 1,
        crop (event) {
          console.log(event.detail.x)
          console.log(event.detail.y)
          console.log(event.detail.width)
          console.log(event.detail.height)
          console.log(event.detail.rotate)
          console.log(event.detail.scaleX)
          console.log(event.detail.scaleY)
        }
      })
      console.log(cropper)
    }
  }
}
</script>
<style lang='less' scoped>
  .setting-container {
    .image-warp {
      text-align: center;
      position: relative;
      .p-col {
        display: inline-block;
        text-align: center !important;
        position: absolute;
        left: 0px;
        right: 0;
        bottom: -30px;
      }
    }
    .img-wrap {
      .img {
        display: block;
        max-width: 100%;
      }
    }
  }
</style>
