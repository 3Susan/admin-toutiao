<template>
  <div class="login">
    <div class="login-container">
      <div class="login-header">
        <div class="header-img"></div>
      </div>
      <el-form ref='rule-Form' :rules="rulesForm" :model="user">
        <el-form-item  prop="mobile">
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="user.code" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox label="我已经同意用户协议和隐私条款" name="type" v-model="user.agree"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="onLogin" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { loginUser } from '@/api/login.js'
import { setToken } from '@/utils/localStorage'
export default {
  name: 'loginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: '',
        agree: false
      },
      loading: false,
      rulesForm: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请正确输入11为手机号', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}/, message: '正确输入6位数字验证码', trigger: 'change' }
        ],
        agree: [
          { // 自定义验证规则
            // value可以拿到当前值
            // 验证成功 callback()
            // 验证失败 callback(new Error('错误提示消息'))
            validator (rule, value, callback) {
              if (value) {
                callback()
              } else {
                callback(new Error('请勾选用户隐私保护协议'))
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  components: { },
  methods: {
    // 给登录按钮注册点击事件
    onLogin () {
      // 获取隐私协议状态请求登录
      // 手动触发表单验证表单验证
      this.$refs['rule-Form'].validate((valid, error) => {
        if (valid) {
          // 显示loading效果不能多次点击
          this.loading = true
          // 登录函数
          this.login()
        }
      })
    },
    // 登录函数
    login () {
      this.loading = true // 改变按钮状态
      loginUser(this.user).then(res => { // 处理后端响应结果
        this.loading = false // 显示loading结束的效果
        this.$message({ // 登录成功
          message: '登录成功',
          type: 'success'
        })
        // 本地保存请求token
        setToken('token', res.data.token)
        // 跳转到首页
        // this.$router.push('/')
        setTimeout(() => {
          this.$router.push({ name: 'home' })
        }, 200)
      }, error => { // 登录失败
        console.log(error)
        this.loading = false // 显示loading结束的效果
        this.$message({
          message: '密码或手机号有误',
          type: 'error'
        })
        throw new Error('密码或手机号有误')
      })
    }

    /* async login () {
      this.loading = true // 改变按钮状态
      try {
        const result = await loginUser(this.user)
        // 处理后端响应结果
        this.loading = false // 显示loading结束的效果
        this.$message({ // 登录成功
          message: '登录成功',
          type: 'success'
        })
        console.log(result.data)
      } catch (error) {
        console.log(error)
        this.loading = false // 显示loading结束的效果
        this.$message({
          message: '密码或手机号有误',
          type: 'error'
        })
      }
    } */
  }
}
</script>
<style lang='less' scoped>
.login {
  .login-container {
    .login-header {
      width: 400px;;
      padding: 20px 0;
      background-color: white;
      .header-img {
        height: 57px;
        width: 300px;
        background: url("./logo_index.png") no-repeat;
        margin-left: 50px;
      }
    }
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url("./login_bg.jpg") no-repeat;
    background-size: cover;
    .el-checkbox:last-of-type {
      padding-bottom: 20px;
    }
    .el-form {
      background-color: white;
      padding: 0px 50px 20px;
      width: 300px;
      .el-button {
        width: 100%;
      }
    }
  }
}

</style>
