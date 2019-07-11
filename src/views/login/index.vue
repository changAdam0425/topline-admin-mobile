<template>
  <div>
    <van-nav-bar title="登录" />
    <form>
      <van-cell-group>
        <van-field v-model="user.mobile"
                   clearable
                   v-validate="'required'"
                   name="mobile"
                   :error-message="errors.first('mobile')"
                   label="手机号"
                   left-icon="contact"
                   placeholder="请输入手机号" />

        <van-field v-model="user.code"
                   v-validate="'required'"
                   name="code"
                   :error-message="errors.first('code')"
                   type="code"
                   label="验证码"
                   left-icon="setting-o"
                   placeholder="请输入验证码" />
      </van-cell-group>
    </form>
    <div class="login-btn">
      <van-button class="btn"
                  type="info"
                  @click="handleLogin"
                  :loading="loginLoading">登录</van-button>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/user.js'
export default {
  name: 'LoginApp',
  data () {
    return {
      user: {
        mobile: '18401683724',
        code: '246810'
      },
      // 控制登录的loading状态
      loginLoading: false
    }
  },
  created () {
    this.configCustomMessages()
  },
  methods: {
    async handleLogin () {
      this.loginLoading = true
      try {
        const valid = await this.$validator.validate()
        if (!valid) {
          // 表单验证失败，取消loading状态
          this.loginLoading = false
          return
        }
        // 表单验证通过
        const data = await login(this.user)
        // 登陆成功，提交mutation
        this.$store.commit('setUser', data)
        console.log(data)
        this.$router.push({
          name: 'Home'
        })
      } catch (err) {
        console.log(err)
        this.$toast.fail('登录失败！')
        this.loginLoading = false
      }
    },

    configCustomMessages () {
      const dict = {
        custom: {
          mobile: {
            required: '手机号不能为空'
          },
          code: {
            required: () => '验证码不能为空'
          }
        }
      }
      this.$validator.localize('zh_CN', dict)
    }
  }
}
</script>
<style lang="less" scoped>
.login-btn {
  padding: 10px;
  .btn {
    width: 100%;
  }
}
</style>
