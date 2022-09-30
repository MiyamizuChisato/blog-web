import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Layout.vue'
import Home from '../views/home/Home.vue'
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
                component: Home,
                meta: {
                    menu: true
                }
            },
            {
                path: '/posts',
                name: 'posts',
                component: () => import('../views/posts/Posts.vue'),
                meta: {
                    menu: true
                }
            },
            {
                path: '/messages',
                name: 'messages',
                component: () => import('../views/messages/Messages.vue'),
                meta: {
                    menu: true
                }
            },
            {
                path: '/friends',
                name: 'friends',
                component: () => import('../views/friends/Friends.vue'),
                meta: {
                    menu: true
                }
            },
            {
                path: '/post/:id',
                name: 'post',
                component: () => import('../views/post/Post.vue'),
                meta: {
                    menu: false
                }
            }

        ]
    }
]
const router = createRouter({
    routes,
    history: createWebHistory()
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
