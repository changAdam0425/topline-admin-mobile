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
                   left-icon="contact"
                   placeholder="请输入验证码" />
      </van-cell-group>
    </form>
    <div class="login-btn">
      <van-button class="btn"
                  type="info">登录</van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoginApp',
  data () {
    return {
      users: {
        mobile: '',
        code: ''
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
