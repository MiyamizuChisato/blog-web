import { nextTick, onBeforeMount } from 'vue'
import { useAppStore } from '../store/appStore.js'

export const sleep = (delay) => {
    return new Promise(resolve => setTimeout(resolve, delay))
}
export default function onLoadFinished(fn, autoClose = true) {
    const appStore = useAppStore()
    onBeforeMount(async () => {
        if (autoClose) {
            try {
                await fn()
                await nextTick()
            } finally {
                await sleep(0)
                appStore.$patch({
                    loading: false
                })
            }
        } else {
            fn()
        }
    })
}
