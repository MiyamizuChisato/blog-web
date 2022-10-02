<script setup>
import PostCard from './components/PostCard.vue'
import onLoadFinished from '../../hooks/onLoadFinished.js'
import { go } from '../../utils/router.js'
import { useAppStore } from '../../store/appStore.js'
import { computed, onUpdated } from 'vue'
import { usePostStore } from '../../store/articleStore.js'
import PostLoad from './components/PostLoad.vue'
import { onBeforeRouteLeave } from 'vue-router'

const appStore = useAppStore()
const postStore = usePostStore()
const posts = computed(() => postStore.page.content)
const loading = computed(() => appStore.loading)
onLoadFinished(async () => {
    if (postStore.page.current <= 0) {
        await postStore.fetchPage()
    }
})
onUpdated(() => {
    window.scrollTo({
        top: appStore.scroll.posts.position
    })

})
onBeforeRouteLeave(() => {
    appStore.scroll.posts.position = document.documentElement.scrollTop || document.body.scrollTop
})
</script>
<template>
    <div v-if='!loading' id='posts' w='xl:1200px' m='x-auto y-6' p='lt-lg:x-3'>
        <v-row :no-gutters='true'>
            <v-col cols='12' lg='8'>
                <div v-for='(post,index) in posts' class='post-wrapper' m='x-auto b-6' :key='index'>
                    <post-card @click='go(`/post/${post.id}`)' :post='post' />
                </div>
                <div>
                    <post-load />
                </div>
            </v-col>

            <v-col cols='4' display='lt-lg:none'>
                <div h='20vh' m='x-9' p='9' bg-container text-primary>
                    内容正在制作中
                </div>
            </v-col>
        </v-row>
    </div>
</template>


<style scoped>
.post-wrapper {
    max-width: 800px;
}
</style>
