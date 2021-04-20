<template>
  <div class='image-container'>
    <!-- card卡片 -->
    <el-card class="box-card" size="mini">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑 -->
      </div>
      <div>
        <!-- 单选钮 -->
         <div class="radio">
            <el-radio-group v-model="collect" @change="handleCollectImage" size="small">
              <el-radio-button label="false">全部</el-radio-button>
              <el-radio-button label="true">收藏</el-radio-button>
            </el-radio-group>
            <el-button
              size="mini"
              type="success"
              @click="dialogUpdateLoader=true"
              >上传素材</el-button>
          </div>
        <!-- /单选钮 -->
        <!-- layout布局 -->
          <div>
            <el-row :gutter="10">
              <el-col  :lg="4" :md="6" :sm="6" :xs="12" v-for="(img,index) in AllImages" :key="index">
                <!-- 图片 -->
                <el-image  style="height:100px" :src="img.url" fit="cover"></el-image>
                <!-- /图片 -->
                <div class="bottom-col">
                   <el-button size="mini"
                    :class="{'el-icon-star-on': img.is_collected,'el-icon-star-off': !img.is_collected}"
                    type="warning"
                    style="font-size:10px"
                    circle
                    :loading="img.loading"
                    @click="collectImge(img)"
                  ></el-button>
                    <el-button size="mini"
                      type="danger"
                      icon="el-icon-delete"
                      style="font-size:10px"
                      circle
                      @click="deleteImage(img)"
                    ></el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        <!-- /layout布局 -->
        <!-- 分页器 -->
        <el-pagination
          small
          layout="prev, pager, next"
          class="pagination"
          :page-size="perPage"
          :total="ImageCount"
          @current-change="changeCount"
        >
        </el-pagination>
        <!-- /分页器 -->
      </div>
    </el-card>
    <!-- /card卡片 -->
    <!-- 弹出层 -->
    <!-- visible.sync：对应弹出层的显示和隐藏
         modal-append-to-body： 是否在body上下具体看组件解析
     -->
    <el-dialog title="上传图片素材"
    v-if="dialogUpdateLoader"
    :visible.sync="dialogUpdateLoader"
    :modal-append-to-body="false"
    >
    <!-- 上传图片
      drag： 可以拖这上传
      action： 请求地址，不走自己配置的请求，默认为post请求格式
      headers： 设置请求头的内容
      name: 请求参数名
      on-success: 文件上传成功的钩子函数
     -->
      <el-upload
        class="upload-demo"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        :headers="token"
        name="image"
        :on-success="upLoadSuccess"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
    <!-- /弹出层 -->
  </div>
</template>
<script>
import { getToken } from '@/utils/localStorage'
import { getAllImage, collectImage, deleteImage } from '@/api/img'
export default {
  name: 'imageIndex',
  data () {
    return {
      collect: false,
      AllImages: [],
      ImageCount: null,
      perPage: 12,
      dialogUpdateLoader: false,
      token: { Authorization: `Bearer ${getToken('token')}` }
    }
  },
  components: { },
  mounted () {
    this.loadingAllImage(false)
  },
  methods: {
    loadingAllImage (collect) {
      getAllImage({
        collect,
        per_page: this.perPage
      }).then(res => {
        const results = res.data.results
        results.forEach(item => {
          item.loading = false
        })
        this.AllImages = results
        this.ImageCount = res.data.total_count
      })
    },
    handleCollectImage (collect) {
      getAllImage({
        collect,
        per_page: this.perPage
      }).then(res => {
        const results = res.data.results
        results.forEach(item => {
          item.loading = false
        })
        this.AllImages = results
        this.ImageCount = res.data.total_count
      })
    },
    changeCount (index) {
      getAllImage({
        per_page: this.perPage,
        page: index
      }).then(res => {
        const results = res.data.results
        results.forEach(item => {
          item.loading = false
        })
        this.AllImages = results
      })
    },
    upLoadSuccess () {
      // 关闭对话框
      this.dialogUpdateLoader = false
      // 重新获取数据
      this.loadingAllImage(false)
    },
    collectImge (img) {
      const id = img.id
      const isCollect = !img.is_collected
      img.loading = !img.loading
      setTimeout(() => {
        collectImage(id, isCollect).then(res => {
          this.loadingAllImage(!isCollect)
        })
        img.loading = !img.loading
      }, 2000)
    },
    deleteImage (img) {
      const id = img.id
      const isCollect = this.collect
      deleteImage(id).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.loadingAllImage(isCollect)
      })
    }
  }
}
</script>
<style lang='less' scoped>
.image-container {
  .radio {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
  }
  .bottom-col[data-v-304287f4] {
    display: flex;
    justify-content: space-between;
  }
  .el-col {
    display: flex;
    justify-content: space-evenly;
    position: relative;
    .el-image {
      margin-bottom: 10px;
      position: relative;
    }
    .bottom-col {
      height:30px;
      background-color:rgba(225, 225, 225, .3);
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 15px 5px 15px;
    }
  }
  .pagination {
    padding-left: 300px;
    margin-top: 10px;
  }
}
</style>
