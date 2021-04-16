import Login from '@/views/login'
import Layout from '@/layout'
const routes = [
    {
        path: '/login',
        component: Login,
        meta: { title: '登录' },
        hidden: true,
    }, {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard'),
            meta: { title: '仪表盘', icon: 'dashboard' }
        }]
    }, {
        path: '/roles',
        component: Layout,
        redirect: 'list',
        meta: { title: '权限管理', icon: 'lock' },
        children: [
            {
                path: 'admin',
                name: 'admin-list',
                component: () => import('@/views/role/admin'),
                meta: { title: '管理员列表' }
            },
            {
                path: 'list',
                name: 'roles-list',
                component: () => import('@/views/role'),
                meta: { title: '权限列表' }
            },
        ]
    }

]

export default routes