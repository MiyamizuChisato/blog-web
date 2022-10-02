<script setup>
import onLoadFinished from '../../hooks/onLoadFinished.js'
import PostImage from './components/PostImage.vue'
import PostInfo from './components/PostInfo.vue'
import { useAppStore } from '../../store/appStore.js'
import { computed, inject, ref } from 'vue'
import Viewer from '../../components/Viewer.vue'
import PostComments from './components/PostComments.vue'
import { useRoute } from 'vue-router'
import { articleGetById } from '../../api/articleApi.js'

const route = useRoute()
const appStore = useAppStore()
const loading = computed(() => appStore.loading)
const article = ref(null)
const oss = inject('oss')
onLoadFinished(async () => {
    const { code, data } = await articleGetById(route.params.id)
    if (code > 0) {
        article.value = data
    }
})
</script>
<template>
    <div v-if='!loading' id='post' m='lg:t-6'>
        <post-image :image='oss+article.image' />
        <div p='x-7.5 y-10' bg-container>
            <post-info :title='article.title' :watch='article.watch' :time='article.createTime' />
            <viewer :markdown='article.content' />
        </div>
        <post-comments :comments='article.comments' />
    </div>
</template>


<style scoped>
#post {
    margin-left: auto;
    margin-right: auto;
    max-width: 720px;
    overflow: hidden;
}
</style>
