// 文章接口相关请求函数
import request from '@/utils/request'
export const getArticles = ({
  // 频道
  channelId,
  // 时间戳，用于分页
  timestamp,
  // 是否包含置顶
  withTop
}) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params: {
      channel_id: channelId,
      timestamp,
      with_top: withTop
    }
  })
}
