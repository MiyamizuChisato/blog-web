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
        <div border='rounded-md' p='6' bg-container text-normal>
            ① 发送你的 <span text-primary>博客地址、博客名称、博客简介和在线头像地址</span> 到 <span text-primary>930801302@qq.com</span>
            或者 <span text-primary>miyamizuchisato@gmail.com</span>，我将在友邻页面完成后，刊登你的友链。<br>
            ② 希望你网站是的非采集、纯技术站点，并且至少每三个月有一次更新。
        </div>
    </div>
</template>
