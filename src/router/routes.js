import Login from '@/views/login'
import Layout from '@/layout'
import RolesMenu from './modules/roles'
import UsersMenu from './modules/users'
import CommunityMenu from './modules/community'
import CommentMenu from './modules/comment'
import ActivityMenu from './modules/activity'
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
    },
    ...UsersMenu,
    ...CommunityMenu,
    ...CommentMenu,
    ...ActivityMenu,
    ...RolesMenu,
    {
        path: '/socket',
        component: Layout,
        children: [{
            path: 'index',
            component: () => import('@/views/socket'),
            meta: { title: '聊天' }
        }]
    }
]

export default routes