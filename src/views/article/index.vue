<template>
  <div class='article-contanier'>
    <el-card class="top">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑 -->
      </div>
      <!-- form表单 -->
      <el-form ref="form"  :model="form" label-width="40px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId">
            <el-option label="全部" :value="null"></el-option>
            <el-option v-for="(channel, index) in channels"
              :key="index"
              :label="channel.name"
              :value="channel.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadTypeArticles(status)" :disabled="loading">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- /form表单 -->
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据筛选查询到{{pageCount}}条数据：</span>
      </div>
      <!-- table表格数据 -->
      <el-table
        v-loading="loading"
        size="mini"
        class="table"
        :data="articles"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="封面"
          align="center">
          <template slot-scope="scope">
            <img class="table-colum-img" v-if="scope.row.cover.images[0]" :src="scope.row.cover.images[0]" alt="">
            <img class="table-colum-img" v-else src="./assets/susa3n.jpg" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          align="center">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center">
          <template slot-scope="scope">
            <el-tag size="mini" :type="tagText[scope.row.status].type">
              {{tagText[scope.row.status].text}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="$router.push('/pulish/?id='+scope.row.id)" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteArticle(scope.row.id)" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /table表格数据 -->
      <!-- 分页器 -->
      <el-pagination
        small
        class="pagination"
        width="auto"
        layout="prev, pager, next"
        :total="pageCount"
        @current-change="changeCurrent"
        :page-size="perPage"
        :disabled="loading"
        :current-page.sync="pageCurrentCount">
      </el-pagination>
      <!-- /分页器 -->
    </el-card>
  </div>
</template>
<script>
import { getArticles, getChannels, deleteAeticleInfo } from '@/api/article'
export default {
  name: 'articleIndex',
  data () {
    return {
      form: {
        region: '',
        date1: '',
        date2: '',
        resource: '',
        value: ''
      },
      articles: [],
      tagText: [
        { status: 0, type: '', text: '草稿' },
        { status: 1, type: 'info', text: '待审核' },
        { status: 2, type: 'success', text: '审核通过' },
        { status: 3, type: 'warning', text: '审核失败' },
        { status: 4, type: 'danger', text: '已删除' }
      ],
      pageCount: 0, // 默认数据总条数
      perPage: 15, // 每页显示数据条数
      status: null, // 当前对应数据状态   默认为全部 null
      channels: [], //  所有对应频道
      channelId: null, //  当前对应频道状态   默认为全部 null
      rangeDate: [], // 日期
      loading: true, // 默认加载状态
      pageCurrentCount: 0 // 当前分页器页码
    }
  },
  components: { },
  mounted () {
    setTimeout(() => {
      this.LoadArticles()
      this.LoadChannels()
    }, 500)
  },
  methods: {
    // 获取当前页面所有的文章列表
    LoadArticles (index = 1) {
      this.loading = true // 请求前loading都为true
      getArticles({
        page: index,
        per_page: this.perPage,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null
      }).then(res => {
        const { results, total_count: totalCount } = res.data
        this.articles = results
        this.pageCount = totalCount
        this.loading = false // 请求完成loading都为false
      })
    },
    // 获取所有频道列表
    LoadChannels () {
      getChannels().then(res => {
        this.channels = res.data.channels
      })
    },
    // 查询对应类型数据
    loadTypeArticles () {
      this.LoadArticles()
    },
    // 根据页面的不同加载不同数据
    changeCurrent (index) {
      this.LoadArticles(index)
    },
    // 删除指定文章传入id
    deleteArticle (id) {
      const target = id.toString() // 有的id过长需要JSONbig这个包转化使用.toString()就是转化的过程
      deleteAeticleInfo(target).then(res => {
        this.LoadArticles(this.pageCurrentCount) // 刷新当前页面
      })
    }
  }
}
</script>
<style lang='less' scoped>
.article-contanier {
  .top {
    margin-bottom: 30px;
  }
  .table {
    margin-bottom: 20px;
  }
  .pagination {
    padding-left: 300px;
  }
  .table-colum-img {
    width: 40px;
    background-size: cover;
  }
}

</style>
