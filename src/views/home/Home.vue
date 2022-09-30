<script setup>
import Carousel from './components/Carousel.vue'
import Self from './components/Self.vue'
import onLoadFinished from '../../hooks/onLoadFinished.js'
import { useAppStore } from '../../store/appStore.js'
import { computed } from 'vue'

const appStore = useAppStore()
const loading = computed(() => appStore.loading)
onLoadFinished(() => {
})
</script>
<template>
    <div v-if='!loading' id='home' w='xl:1032px md:760px' m='x-auto' p='lt-lg:x-3'>
        <div text='5' m='y-5' font='600' text-strong>随机推荐</div>
        <div m='b-10' border='rounded-md' overflow='hidden'>
            <carousel />
        </div>
        <div text='5' m='y-5' font='600' text-strong>看看我的</div>
        <div>
            <self />
        </div>
        <div text='5' m='y-5' font='600' text-strong>看看你的</div>
    </div>
</template>

<style scoped>

.banner {
    height: 100vh;
    background-size: cover;
    background-position: top left;
    background-repeat: no-repeat;
}
</style>
