// 封装用户相关接口请求函数

import request from '@/utils/request.js'

export const login = ({ mobile, code }) => {
  request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}
