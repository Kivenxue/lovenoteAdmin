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
