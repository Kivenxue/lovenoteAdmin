import router from '@/router'
import Cookies from 'js-cookie'

const TokenKey = 'ADMIN_SGIN_TOKEN'
const userInfoKey = "ADMIN_USER_INFO"

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserInfo() {
  return JSON.parse(window.localStorage.getItem(userInfoKey))
}

export function setUserInfo(data) {
  window.localStorage.setItem(userInfoKey, JSON.stringify(data))
}

export function removeUserInfo() {
  window.localStorage.removeItem(userInfoKey)
}

export function deToken() {
  const token = getToken()
  let { Base64 } = require('js-base64')
  try {
    let str = token.split('.')[1];
    let user = JSON.parse(Base64.decode(str))
    return user
  } catch (error) {
    removeToken()
    router.push({ path: '/login' })
    throw new Error('Token 无效')
  }
}
