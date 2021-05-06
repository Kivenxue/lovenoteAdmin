/**
 * 基础数据接口
 */
import http from '@/http'
import { BaseAction } from './interface'
// 获取图片验证码
export function getCaptchaCode() {
    return http({
        url: BaseAction.captcha,
        method: 'get'
    })
}
// 验证图片验证码
export function checkCaptcha(key, value) {
    return http({
        url: BaseAction.checkcaptcha,
        method: 'post',
        data: { key, value }
    })
}