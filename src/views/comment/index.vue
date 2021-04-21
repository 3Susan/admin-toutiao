<template>
  <div class='comment-container'>
   <el-card class="box-card" size="mini">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑 -->
      </div>
      <div>
        <!-- 表格 -->
        <el-table
          size="mini"
          :data="comments"
          stripe
          style="width: 100%">
          <el-table-column
            prop="title"
            label="标题">
          </el-table-column>
          <el-table-column
            prop="total_comment_count"
            label="总评论数">
          </el-table-column>
          <el-table-column
            prop="fans_comment_count"
            label="粉丝评论数">
          </el-table-column>
          <el-table-column
            prop="comment_status"
            label="状态">
            <template slot-scope="scope">
              {{ scope.row.comment_status ? '正常' : '关闭' }}
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.comment_status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :disabled="scope.row.loading"
                @change="updateStatus(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
        <!-- /表格 -->
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
        <!-- /完整版分页器 -->
      </div>
   </el-card>
  </div>
</template>
<script>
import { getArticles, editCommentStatus } from '@/api/article'
export default {
  name: 'commentIndex',
  data () {
    return {
      comments: [],
      total: null,
      currentPage: 1
    }
  },
  components: { },
  created () {
    getArticles({ response_type: 'comment' })
      .then(res => {
        res.data.results.forEach(item => {
          item.loading = false
        })
        this.comments = res.data.results
        this.total = res.data.total_count
      })
  },
  methods: {
    updateStatus (comment) {
      comment.loading = true
      const id = comment.id.toString()
      const status = comment.comment_status
      editCommentStatus(id, status).then(res => {
        this.$message({
          type: 'success',
          message: '修改评论状态成功',
          duration: 500
        })
        setTimeout(() => {
          comment.loading = false
        }, 800)
      })
    },
    // 当前页条数改变
    handleSizeChange (value) {
      getArticles({
        response_type: 'comment',
        per_page: value
      }).then(res => {
        res.data.results.forEach(item => {
          item.loading = false
        })
        this.comments = res.data.results
      })
    },
    // 当前页数改变
    handleCurrentChange (index) {
      getArticles({
        response_type: 'comment',
        page: index
      }).then(res => {
        res.data.results.forEach(item => {
          item.loading = false
        })
        this.comments = res.data.results
      })
    }
  }
}
</script>
<style lang='less' scoped>
.comment-container {
  .block {
    margin-top: 20px;
  }
}
</style>
