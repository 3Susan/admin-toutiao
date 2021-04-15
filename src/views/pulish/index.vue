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
      <el-form ref="pulish-form" :model="article" :rules="formRules" label-width="60px" size="mini">
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-tiptap
            v-model="article.content"
            :extensions="extensions"
            lang="zh"
            height="400"
            placeholder="请输入文本内容"
          />
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="-1">自动</el-radio>
            <el-radio :label="0">无图</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道"  prop="channel_id">
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
import { handleImage } from '@/api/img'
import {
  // 需要的 extensions
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  TextColor,
  Heading, // 标题
  Bold, // 加粗
  Underline, // 下划线
  Italic, // 斜体
  Strike, // 加粗
  Image, // 图片
  CodeView,
  Preview,
  FontType,
  FontSize,
  ListItem,
  TodoList,
  BulletList, // 无序列表
  OrderedList, // 有序列表
  TodoItem,
  CodeBlock,
  Fullscreen
} from 'element-tiptap'
// import element-tiptap 样式
import 'element-tiptap/lib/index.css'
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
      channels: [], // 所有的文章列表
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }), // 标题
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new FontSize(),
        new FontType(),
        new TextColor(),
        new Image({ // Image上传本地图片会将图片转为base64格式，需要通过配置请求转为url格式
          // urlPattern:  校验url地址
          uploadRequest (file) { // 关于上传本地图片都会执行当前函数
            const fd = new FormData() // FormData函数用来处理文件（上传）相关
            fd.append('image', file) // image是请求体要求 不是随便传
            return handleImage(fd).then(res => { // 请求函数 转为url
              return res.data.url // return 返回一个地址 就是上传图片的url
            })
          }
        }), // 配置图片用来处理图片转换
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new CodeBlock(),
        new CodeView(),
        new Preview(),
        new Fullscreen()
      ],
      formRules: {
        title: [
          { required: true, message: '请输入标题', tirgger: 'blur' },
          { min: 3, max: 10, message: '标题长度3~10', trigger: 'change' }
        ],
        content: [
          {
            validator (rule, value, callback) {
              if (value === '<p></p>') {
                callback(new Error('请输入文本内容'))
              } else {
                callback()
              }
            }
          },
          { required: true, message: '请输入文本内容' }
        ],
        channel_id: [
          { required: true, message: '请选择发表频道', trigger: 'change' }
        ]
      }
    }
  },
  components: { 'el-tiptap': ElementTiptap },
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
      // 手动触发验证
      this.$refs['pulish-form'].validate((valid) => {
        // valid 验证通过返回true,验证失败提示
        if (!valid) {
          console.log('检查表单')
        } else {
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
        }
      })
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
