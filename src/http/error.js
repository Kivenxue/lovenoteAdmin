/**
 * 错误处理
 */
import { removeToken } from '@/utils/auth'
import { STATUE_CODE } from '@/api'
import router from '@/router'
import { Message } from 'element-ui'

/**创建一个错误 */
function createError(msg) {
    const err = new Error(msg)
    errorLog(err)
}

// 记录与显示错误
export const errorLog = (err) => {
    // 如果为开发环境则将错误打印到控制台
    if (process.env.NODE_ENV === 'development') {
        console.log(err);
    }

    // 展示错误
    Message({
        type: "error",
        message: err.message,
        duration: 3000
    })

    // 抛出错误
    throw new Error(error.message)
}

/**
 * 
 * @param {*} res 后端响应的数据
 */
export const handleError = (res) => {
    console.log(res);
    const { code } = res
    switch (code) {
        case STATUE_CODE.ERROR:
            Message({
                message: res.msg,
                type: 'error',
                duration: 3000
            })
            break;
        // token 过期·
        case STATUE_CODE.TOKEN_OVERDUE:
            removeToken();
            router.push({ path: '/login' })
            break;
        default:
            createError(res.message);
            break

    }
}