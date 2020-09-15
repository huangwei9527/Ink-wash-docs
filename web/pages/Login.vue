<template>
  <div class="page page-login">
    <page-background class="login-background" />

    <div class="login-page-inner">
      <p class="title">水墨文档</p>
      <el-form :model="formData" :rules="formRules" ref="loginForm" label-width="0px">
        <el-form-item prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" @keyup.enter.native="doLogin">
            <i slot="prefix" class="iconfont icon-zhanghao"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formData.password" placeholder="请输入密码"  :type="inputType" @keyup.enter.native="doLogin"  v-if="inputType==='password'">
            <i slot="prefix" class="iconfont icon-mima"></i>
            <span slot="suffix" class="cursor-pointer" @mousedown="mousedownPassword">
              <i class="iconfont icon-yincangmima"></i>
            </span>
          </el-input>
          <el-input v-model="formData.password" placeholder="请输入密码" :type="inputType" @keyup.enter.native="doLogin" v-else>
            <i slot="prefix" class="iconfont icon-mima"></i>
            <span slot="suffix" class="cursor-pointer" @mousedown="mousedownText">
              <i class="iconfont icon-xianshimima" ></i>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="btn-hover" @click="doLogin">登录</div>
        </el-form-item>
      </el-form>
      <router-link to="/retrievePassword">
        <p class="forgot-password">注册</p>
      </router-link>
      <p class="login-page-bottom">Copyright © 2020 <span class="primary">水墨文档版权所有</span></p>
    </div>
  </div>
</template>

<script>
  import pageBackground from '@/components/page-background'
  import {
	  Form,
	  FormItem,
	  Input
  } from 'element-ui'
	export default {
		components: {
			[Form.name]: Form,
			[FormItem.name]: FormItem,
			[Input.name]: Input,
			pageBackground
    },
    data(){
			return {
				loading: false,
				loadingVerify: false,
				inputType: 'password',
				formData: {
					username: '',
					password: ''
				},
				formRules: {
					username: [
						{required: true, message: '用户名不能为空', trigger: 'blur'}
					],
					password: [
						{required: true, message: '密码不能为空', trigger: 'blur'}
					]
				}
      }
    },
		created() {
			// 进入登录页面先清空个人信息
		},
		methods: {
			/**
			 登陆
			 */
			doLogin() {
				// 验证成功
				this.$refs.loginForm.validate((valid) => {
					if (valid) {
						let formData = {...this.formData}
						formData.password = this.AES.Encrypt(formData.password)

						// todo 登录操作

					} else {
						this.$store.dispatch('showMassage', {type: 'error', message: '请正确填写表单！'})
						return false;
					}
				});
			},
			mousedownPassword() {
				this.inputType = 'text'
			},
			mousedownText() {
				this.inputType = 'password'
			},
			mouseup() {
				this.inputType = 'password'
			},
		}
	}
</script>

<style lang="scss" scoped>
.page-login{
  position: relative;
  width: 100%;
  height: 100%;

}
.login-background{
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.page-login {
  height: 100%;
  width: 100%;
  padding: 1px;
  background-color: #fff;
  display: flex;
  justify-content:center;
  align-items:center;
  position: relative;
  z-index: 10;
}

.login-page-inner {
  position: relative;
  z-index: 10;
  width: 360px;
  padding: 20px 40px;
  margin-top: -120px;
  background: white;
  box-shadow: 0px 0px 0px rgba(58, 127, 158, 0.35);
  border-radius: 4px;
  background:rgba(165, 165, 165, .58);
  .title {
    padding: 10px 0 30px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: rgba(65, 186, 120, 1);
  }
  /**
  鼠标悬浮渐变
  */
  .btn-hover {
    margin-top: 20px;
    text-align: center;
    color: white;
    background: linear-gradient(to right, #5ac66a 0%, #3AA27F 60%, #207b5d 100%);
    transition: all 3s;
    border-radius: 4px;
    cursor: pointer;
  }
  .btn-hover:hover {
    transition: all 3s;
    background: linear-gradient(to right, #5ac66a 0%, #3AA27F 60%, #207b5d 100%);
  }
  .btn-hover:active {
    transition: all 3s;
    background: linear-gradient(to right, #5ac66a 0%, #3AA27F 40%, #207b5d 100%);
  }
  .login-page-bottom {
    font-size: 12px;
    color: #666;
    text-align: center;
  }
  .forgot-password {
    text-align: right;
    font-size: 12px;
    margin-bottom: 20px;
    cursor: pointer;
    color: #333;
  }
}

</style>
