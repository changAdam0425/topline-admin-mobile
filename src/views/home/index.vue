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
          <!-- 列表  上拉刷新-->
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
import { getArticles } from '@/api/article'
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
  computed: {
    // 获取当前激活的频道
    activeChannel () {
      return this.channels[this.activeChannelIndex]
    }
  },
  methods: {
    // 获取频道
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
      channels.forEach(item => {
        item.articles = [] // 存储当前的文章列表
        item.downPullLoading = false // 控制当前频道的下拉刷新的loading状态
        item.ulPullLoading = false // 控制当前频道的上滑刷新的loading状态
        item.ulPullFinished = false // 控制当前频道是否加载完毕
      })

      this.channels = channels
    },
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 500)
    },
    // 上拉加载更多  push数据
    async onLoad () {
      console.log('onload')
      const data = await this.loadArticles()
      console.log(data)
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
    },
    //  获取文章
    async loadArticles () {
      const { id: channelId } = this.activeChannel
      const data = await getArticles({
        channelId,
        timestamp: Date.now(),
        withTop: 1
      })
      return data
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
