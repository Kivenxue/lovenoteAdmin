import Layout from '@/layout'
const UsersMenu = [{
    path: '/users',
    component: Layout,
    meta: { title: '用户管理', icon: 'users' },
    children: [{
        path: 'list',
        meta: { title: '用户列表' },
        component: () => import('@/views/users')
    }]
}]
export default UsersMenu