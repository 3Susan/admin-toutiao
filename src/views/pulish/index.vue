<template>
  <div class='pulish-contanier'>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 面包屑 -->
      <div slot="header" class="clearfix" size="mini">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-if="$route.query.id">编辑文章</el-breadcrumb-item>
          <el-breadcrumb-item v-else>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- /面包屑 -->
      <!-- form表单 -->
      <el-form ref="form" :model="article" label-width="50px" size="mini">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="-1">自动</el-radio>
            <el-radio :label="0">无图</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择活动频道">
            <el-option v-for="(channel,index) in channels" :key="index" :label="channel.name" :value="channel.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="PulishArticle(false)">发表</el-button>
          <el-button @click="PulishArticle(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
      <!-- /form表单 -->
    </el-card>
  </div>
</template>
<script>
import { getChannels, pulishArticleInfo, getArticleInfo, editArticleInfo } from '@/api/article'
export default {
  name: 'pulishIndex',
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 文章发布图片类型
          images: []
        },
        channel_id: '' // 文章列表ID
      },
      channels: [] // 所有的文章列表
    }
  },
  components: { },
  mounted () {
    this.loadChannels()
    const id = this.$route.query.id
    if (id) {
      // 如果有动态id加载当前文章信息
      this.loadArticleInfo(id)
    }
  },
  methods: {
    PulishArticle (draft) {
      const id = this.$route.query.id
      if (id) { // 如果有文章id进行编辑
        editArticleInfo(id, this.article, draft).then(res => {
          this.$message({
            type: 'success',
            message: '发布成功'
          })
          this.$router.push('/article')
        })
      } else { // 如果没有文章id发布内容
        const data = this.article
        pulishArticleInfo(data, draft).then(res => {
          this.$message({
            type: 'success',
            message: `${draft ? '存入草稿' : '发布'}成功`
          })
          this.$router.push('/article')
        })
      }
    },
    // 获取所有的文章列表
    loadChannels () {
      getChannels().then(res => {
        this.channels = res.data.channels
      })
    },
    // 获取指定文章内容
    loadArticleInfo (id) {
      getArticleInfo(id).then(
        res => {
          this.article = res.data
        }
      )
    }
  }
}
</script>
<style lang='less' scoped>
</style>
