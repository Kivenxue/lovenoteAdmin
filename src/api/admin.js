/**
 * 管理员接口
 */
import http from '@/http'

// 管理员登录
export function login(data) {
    return http({
        url: '/login',
        method: 'post',
        data
    })
}
// 退出登录
export function logout(token) {
    return http({
        url: '/logout',
        methods: 'post',
        data: token
    })
}
