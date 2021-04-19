/**
 * 基础数据接口
 */
import http from '@/http'
// 获取图片验证码
export function getCaptchaCode() {
    return http({
        url: '/captcha/code',
        method: 'get'
    })
}