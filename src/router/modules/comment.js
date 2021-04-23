import Layout from '@/layout'

const CommentMenu = [
    {
        path: '/comment',
        component: Layout,
        meta: { title: '评论管理', icon: 'comment' },
        children: [{
            path: 'list',
            component: () => import('@/views/comment'),
            meta: { title: '评论列表' }
        }]
    }
]
export default CommentMenu