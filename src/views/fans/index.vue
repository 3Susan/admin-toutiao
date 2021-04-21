<template>
  <div class='fans-contanier'>
    <el-card class="box-card" size="mini">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑 -->
      </div>
      <div>
        <el-row type="flex" :gutter="20" class="row-bg">
          <el-col :span="4" v-for="(fans,index) in AllFans" :key="index">
            <div class="img-wrap">
              <el-image
                class="img"
                :src="fans.photo"
                fit="cover"
              ></el-image>
              <p>{{fans.name}}</p>
              <el-button type="success"  v-show="!fans.loading" @click="onFlow(fans)" size="mini">关注</el-button>
              <el-button type="warning"  v-show="fans.loading" @click="onFlow(fans)" size="mini">已关注</el-button>
            </div>
          </el-col>
        </el-row>
        <!-- 完整版分页器 -->
        <div class="block">
          <el-pagination
            :background="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
        <!-- /完整版分页器-->
      </div>
   </el-card>
  </div>
</template>
<script>
import { getAllFans } from '@/api/fans'
export default {
  name: 'fansIndex',
  data () {
    return {
      AllFans: [],
      total: null,
      currentPage: 1
    }
  },
  components: { },
  created () {
    getAllFans({
      page: this.currentPage
    }).then(res => {
      res.data.results.forEach(item => {
        item.loading = false
      })
      this.AllFans = res.data.results
      this.total = res.data.total_count
    })
  },
  methods: {
    // 当前页条数改变
    handleSizeChange (value) {
      getAllFans({
        per_page: value
      }).then(res => {
        res.data.results.forEach(item => {
          item.loading = false
        })
        this.AllFans = res.data.results
      })
    },
    // 当前页数改变
    handleCurrentChange (index) {
      getAllFans({
        page: index
      }).then(res => {
        res.data.results.forEach(item => {
          item.loading = false
        })
        this.AllFans = res.data.results
      })
    },
    onFlow (fans) {
      fans.loading = !fans.loading
    }
  }
}
</script>
<style lang='less' scoped>
.fans-contanier {
  .el-col {
    border: 1px  dashed rgba(238, 238, 238);
  }
  .img-wrap {
    margin-top: 10px;
    height: 200px;
    width: 150px;
    display: flex;
    align-items: center;
    flex-direction: column;
    .img {
      height: 100px;
      width: 100px;
      border-radius: 50%;
    }
    p {
      margin-top: 15px;
    }
  }
}
</style>
