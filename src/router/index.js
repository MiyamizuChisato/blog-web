import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Layout.vue'
import Home from '../views/home/Home.vue'
import Posts from '../views/posts/Posts.vue'
import Post from '../views/post/Post.vue'
import Messages from '../views/messages/Messages.vue'
import Friends from '../views/friends/Friends.vue'
import User from '../views/user/User.vue'
import { useAppStore } from '../store/appStore.js'

const routes = [
    {
        path: '/',
        name: 'layout',
        component: Layout,
        children: [
            {
                path: '/',
                name: 'index',
                component: Home
            },
            {
                path: '/posts',
                name: 'posts',
                component: Posts
            },
            {
                path: '/messages',
                name: 'messages',
                component: Messages
            },
            {
                path: '/friends',
                name: 'friends',
                component: Friends
            },
            {
                path: '/post/:id',
                name: 'post',
                component: Post
            },
            {
                name: 'user',
                path: '/user/:id',
                component: User
            }, {
                name: 'write',
                path: '/write',
                component: () => import('../views/admin/Write.vue')
            }

        ]
    }
]
const router = createRouter({
    routes,
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        return {
            top: 0,
            left: 0
        }
    }
})
router.beforeEach((to, from, next) => {
    const appStore = useAppStore()
    if (to.name !== from.name) {
        appStore.loading = true
    }
    NProgress.start()
    next()
})
router.afterEach((to, from, failure) => {
    NProgress.done()
})
export default router
