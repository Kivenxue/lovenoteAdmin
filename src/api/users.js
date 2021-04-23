import http from '@/http'

/**用户列表 */
export function list(page, where) {
    return http({
        url: '/user/list',
        method: 'get',
        params: { page, where }
    })
}
/**渲染单行数据 */
export function listOne(id) {
    console.log(id);
    return http({
        url: '/user/list/one',
        method: 'get',
        params: { id }
    })
}
/**封禁用户 */
export function ban(data) {
    return http({
        url: '/user/ban',
        method: 'post',
        data: data
    })
}
/**解除封禁 */
export function removeBan(id) {
    return http({
        url: '/user/removeban',
        method: "post",
        data: id
    })
}