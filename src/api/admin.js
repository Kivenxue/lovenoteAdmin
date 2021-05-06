/**
 * 管理员接口
 */
import http from '@/http'
import { AdminAction } from './interface'

// 管理员登录
export function login(data) {
    return http({
        url: AdminAction.login,
        method: 'post',
        data
    })
}

// 退出登录
export function logout(id) {
    return http({
        url: AdminAction.logout,
        method: 'post',
        data: id
    })
}
