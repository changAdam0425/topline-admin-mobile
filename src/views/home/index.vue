<template>
  <div class="home">
    <van-nav-bar title="首页"
                 fixed />
    <van-tabs v-model="activeChannelIndex"
              class="channel-tabs">
      <van-tab v-for="channelItem in channels"
               :key="channelItem.id"
               :title="channelItem.name">
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
    </van-tabs>
  </div>
</template>
<script>
import { getUserChannels } from '@/api/channel'
export default {
  name: 'HomeApp',
  data () {
    return {
      // 激活状态的频道的index
      activeChannelIndex: 0,
      // 频道列表
      channels: [],
      count: 0,
      isLoading: false,
      list: [],
      loading: false,
      finished: false
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      const { user } = this.$store.state
      let channels = []
      if (user) {
        // 已登录
        const data = await getUserChannels()
        // console.log(data)
        channels = data.channels
      } else {
        // 未登录
        const localchannels = JSON.parse(window.localStorage.getItem('channels'))
        if (localchannels) {
          channels = localchannels
        } else {
          const data = await getUserChannels()
          channels = data.channels
        }
      }
      this.channels = channels
    },
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
.channel-tabs {
  margin-bottom: 100px;
}
.channel-tabs /deep/ .van-tabs__wrap {
  position: fixed;
  top: 92px;
}
.channel-tabs /deep/ .van-tabs__content {
  margin-top: 100px;
}
</style>
