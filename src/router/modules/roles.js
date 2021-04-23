import Layout from '@/layout'
/**
 * 权限管理菜单
 */
const RolesMenu = [
    {
        path: '/admin',
        component: Layout,
        redirect: 'adminList',
        meta: { title: '角色管理', icon: 'admin' },
        children: [
            {
                path: 'list',
                name: 'admin-list',
                component: () => import('@/views/role/admin'),
                meta: { title: '管理员列表' }
            },
            {
                path: 'edit',
                name: 'admin-edit',
                component: () => import('@/views/role'),
                meta: { title: '管理员添加' }
            },

        ]
    }
]
export default RolesMenu