// 管理员模块
export const AdminAction = {
    login: '/login', // 登录
    logout: '/logout' // 退出登录

}
// 用户模块
export const UserAction = {
    list: '/user/list', // 用户列表
    listOne: '/user/list/one', // 查询一条用户 用于渲染单行数据 
    ban: '/user/ban', // 封禁用户
    removeBan: '/user/removeban' // 解除封禁 
}

// 基础模块
export const BaseAction = {
    captcha: '/captcha/code', // 获取图片验证码
    checkcaptcha: '/captcha/check',// 验证图片验证码
    upload: "/file/upload" // 文件上传
}

// 社区模块
export const CommunityAction = {
    list: '/community/list' // 社区帖子列表
}