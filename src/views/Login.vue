<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box" @keyup.enter.native="onSubmit('loginForm')">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="form.username" autofocus="true" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {login} from '@/api/api'
import Message from 'element-ui'
  export default {
    name: "Login",
    data() {
      return {
        form: {
          username: '',
          password: ''
        },

        // 表单验证，需要在 el-form-item 元素中增加 prop 属性
        rules: {
          username: [
            {required: true, message: '账号不可为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不可为空', trigger: 'blur'}
          ]
        },

        // 对话框显示和隐藏
        dialogVisible: false
      }
    },
    methods: {
      onSubmit(formName) {
        // 为表单绑定验证功能
        this.$refs[formName].validate((valid) => {
          if (valid) {
            login(this.form).then((res) => {
              if(!res.data.token) return Message({
                  message: res.message || 'Error',
                  type: 'error',
                  duration: 5 * 1000
                });

              localStorage.setItem('token', res.data.token)
              // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
              this.$router.push("/main");
            })
          } else {
            this.dialogVisible = true;
            return false;
          }
        });
      },
      handleClose(e) {}
    }
  }
</script>

<style lang="scss" scoped>
  .login-box {
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 1px 1px 25px #333;
    background-color: #fff;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
  .login-container{
    background-color: #555;
    width: 100%;
    min-height: 100vh;
    top: 0;
    position: absolute;
  }
</style>
