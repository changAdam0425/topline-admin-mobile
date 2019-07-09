<template>
  <div>
    <van-nav-bar title="登录" />
    <form>
      <van-cell-group>
        <van-field v-model="user.mobile"
                   clearable
                   label="手机号"
                   left-icon="contact"
                   placeholder="请输入手机号" />

        <van-field v-model="user.code"
                   label="验证码"
                   left-icon="setting-o"
                   placeholder="请输入验证码" />
      </van-cell-group>
    </form>
    <div class="login-btn">
      <van-button class="btn"
                  type="info"
                  @click="handleLogin">登录</van-button>
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
        code: '123456'
      }
    }
  },
  methods: {
    async handleLogin () {
      try {
        const data = await login(this.user)
        console.log(data)
      } catch (err) {
        console.log(err)
        console.log('登录失败')
      }
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
