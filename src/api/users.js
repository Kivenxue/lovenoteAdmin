import http from '@/http'
import { UserAction } from './interface'

/**用户列表 */
export function list(page, where) {
    return http({
        url: UserAction.list,
        method: 'get',
        params: { page, where }
    })
}
/**渲染单行数据 */
export function listOne(id) {
    console.log(id);
    return http({
        url: UserAction.listOne,
        method: 'get',
        params: { id }
    })
}
/**封禁用户 */
export function ban(data) {
    return http({
        url: UserAction.ban,
        method: 'post',
        data: data
    })
}
/**解除封禁 */
export function removeBan(id) {
    return http({
        url: UserAction.removeBan,
        method: "post",
        data: id
    })
}