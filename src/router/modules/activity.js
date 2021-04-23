import Layout from '@/layout'

const ActivityMenu = [{
    path: '/activity',
    component: Layout,
    meta: { title: '活动管理', icon: 'activity' },
    children: [{
        path: 'list',
        component: () => import('@/views/activity'),
        meta: { title: '活动列表' }
    }, {
        path: 'edit',
        component: () => import('@/views/activity/edit'),
        meta: { title: '编辑活动' }
    }]
}]
export default ActivityMenu