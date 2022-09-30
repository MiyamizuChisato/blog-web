import { onMounted, ref } from 'vue'
import { useWindowScroll } from '@vueuse/core'

export const headerControl = () => {
    const show = ref(true)
    onMounted(() => {
        let top = 0
        window.addEventListener('scroll', () => {
            const { y } = useWindowScroll()
            show.value = y.value < top
            top = y.value
        })
    })
    return show
}
