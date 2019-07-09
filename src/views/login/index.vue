<template>
  <div>
    <van-nav-bar title="登录" />
    <form>
      <van-cell-group>
        <van-field v-model="users.mobile"
                   clearable
                   label="手机号"
                   left-icon="contact"
                   placeholder="请输入手机号" />

        <van-field v-model="users.code"
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
import axios from 'axios'
export default {
  name: 'LoginApp',
  data () {
    return {
      users: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async handleLogin () {
      const res = await axios({
        method: 'POST',
        url: 'http://toutiao.course.itcast.cn/app/v1_0/authorizations',
        data: this.users
      })
      console.log(res)
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
