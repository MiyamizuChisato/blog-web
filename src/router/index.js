import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import HelloWord from '../components/HelloWorld.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'index',
        component: HelloWord
    }
]
const router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})
router.afterEach((to, from, failure) => {
    NProgress.done()
})
export default router
