// 封装频道相关接口请求函数
import request from '@/utils/request.js'

export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
