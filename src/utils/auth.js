// 将操作本地存储中用户数据的信息封装为一个模块
// 然后在任何需要操作本地存储中 user 的地方去使用

const USER_KEY = 'user'

export const getUser = () => {
  return JSON.parse(window.localStorage.getItem(USER_KEY))
}

export const setUser = (data) => {
  return window.localStorage.setItem(USER_KEY, JSON.stringify(data))
}

export const removeUser = () => {
  return window.localStorage.removeItem(USER_KEY)
}
