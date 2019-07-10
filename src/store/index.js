import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 初始化的时候从本地存储获取数据，防止刷新丢失token
    user: auth.getUser()
  },
  mutations: {
    // 登陆成功，提交mutation更改容器中的数据
    setUser (state, data) {
      state.user = data
      auth.saveUser(state.user)
    }
  },
  actions: {

  }
})
