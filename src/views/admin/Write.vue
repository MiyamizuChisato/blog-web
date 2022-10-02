<script setup>
import onLoadFinished from '../../hooks/onLoadFinished.js'
import { useUserStore } from '../../store/userStore.js'
import { computed, reactive } from 'vue'
import { articlePost } from '../../api/articleApi.js'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const user = computed(() => userStore.user)
const router = useRouter()
const article = reactive({
    title: '',
    content: [],
    image: []
})

onLoadFinished(() => {
    if (user.value.id !== 1) {
        location.href = '/'
    }
})

const submitTrigger = async () => {
    const fd = new FormData()
    fd.append('title', article.title)
    fd.append('image', article.image[0])
    fd.append('content', article.content[0])
    const { code, data } = await articlePost(fd)
    if (code > 0) {
        await router.push(`/post/${data.id}`)
    }
}
</script>
<template>
    <div m='x-auto y-6' w='md:720px 90%'>
        <v-text-field v-model='article.title' label='标题' placeholder='标题' />
        <v-file-input v-model='article.image' label='主题图片' placeholder='主题图片'
                      prepend-icon='i-mdi-file-image-box' />
        <v-file-input v-model='article.content' label='MD文件' placeholder='MD文件'
                      prepend-icon='i-mdi-file-document' />
        <div m='x-auto' w='50%'>
            <v-btn @click='submitTrigger' variant='text' bg-primary block>
                <span text-light>提交</span>
            </v-btn>
        </div>
    </div>
</template>


<style scoped>

</style>
