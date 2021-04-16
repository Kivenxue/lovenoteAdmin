/**
 * 封装 axios 拦截器
 */
import axios from 'axios'
import { getToken } from '@/utils/auth'
import { STATUE_CODE, BASE_API } from '@/api/index'
import { handleError } from './error'
import { encrypt, decrypt } from '@/utils/crypto'
import { Message } from 'element-ui'

/**创建 axios */
const http = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 200000
})

// 请求拦截
http.interceptors.request.use(
    (config) => {
        // 加密参数
        if (process.env.VUE_APP_DECRYPT === 'true') {
            const method = config.method
            switch (method.toLocaleUpperCase()) {
                case 'GET':
                    let aesParams = encrypt(config.params)
                    config.params = {}
                    config.params.p = aesParams
                    break
                case 'POST':
                case 'PUT':
                case 'DELETE':
                    let aesData = encrypt(config.data)
                    config.data = {}
                    config.data.p = aesData
            }
        }
        // 请求头写入token
        if (getToken()) {
            config.headers['Authorization'] = getToken()
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

// 响应拦截
http.interceptors.response.use(
    (response) => {
        let dataAxios = response.data;
        if (process.env.VUE_APP_DECRYPT == 'true' && response.data) {
            dataAxios = JSON.parse(decrypt(dataAxios))
            response.data = dataAxios

        }
        // 获取后端返回的数据
        const { code, data, msg } = dataAxios
        // 根据 code 进行判断
        if (!code) {
            return dataAxios;
        } else {
            switch (code) {
                case STATUE_CODE.SUCCESS:
                    if (msg.length) {
                        Message.success(msg)
                    }
                    console.log(data);
                    return data
                default:
                    handleError(dataAxios)
                    break;
            }
        }
    }
)

export default http



