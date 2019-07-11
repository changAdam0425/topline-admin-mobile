<template>
  <div class="home">
    <van-nav-bar title="首页" />
    <van-tabs v-model="activeChannelIndex">
      <van-tab title="标签 1">
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="isLoading"
                          @refresh="onRefresh">
          <!-- 列表 -->
          <van-list v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad">
            <van-cell v-for="item in list"
                      :key="item"
                      :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  name: 'HomeApp',
  data () {
    return {
      // 激活状态的频道的index
      activeChannelIndex: 0,
      count: 0,
      isLoading: false,
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 500)
    },
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }
}

</script>
<style lang="less" scoped>
</style>
