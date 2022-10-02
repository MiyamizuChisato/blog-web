<script setup>
import { computed, onMounted, ref } from 'vue'
import { sleep } from '../../../hooks/onLoadFinished.js'
import { usePostStore } from '../../../store/articleStore.js'

const load = ref(null)
const postStore = usePostStore()
const last = computed(() => postStore.page.last)
onMounted(() => {
    const ob = new IntersectionObserver(async change => {
        const item = change[0]
        if (item.isIntersecting) {
            await sleep(1500)
            await postStore.fetchPage()
        }
    })
    ob.observe(load.value)
})
</script>
<template>
    <div class='post-load' ref='load' m='t-6 x-2'>
        <div v-if='last' flex-center text-secondary> ┭┮﹏┭┮ 没有更多啦</div>
        <h1 v-else m='b-5'>
            <v-progress-linear indeterminate color='cyan'></v-progress-linear>
        </h1>
    </div>
</template>
<style scoped>
.post-load {
    border-radius: 4px;
}
</style>
