import Layout from '@/layout'

const CommunityMenu = [
    {
        path: '/community',
        component: Layout,
        redirect: '/community/list',
        meta: { title: '社区管理', icon: 'community' },
        children: [{
            path: 'list',
            component: () => import('@/views/community'),
            meta: { title: '帖子列表' }
        }, {
            path: 'edit',
            component: () => import('@/views/community/edit'),
            meta: { title: '编辑帖子' }
        }]
    }
]
export default CommunityMenu