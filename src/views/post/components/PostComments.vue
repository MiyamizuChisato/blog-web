<script setup>
import CommentWrapper from './CommentWrapper.vue'
import Editor from '../../../components/Editor.vue'
import { computed, provide, reactive, ref } from 'vue'
import { useUserStore } from '../../../store/userStore.js'
import { useRoute } from 'vue-router'
import { commentPost } from '../../../api/commentApi.js'

defineProps({
    comments: Array
})
const route = useRoute()
const userStore = useUserStore()
const user = computed(() => userStore.user)
const placeholder = ref('在此处编辑评论内容')
const comment = reactive({
    content: '',
    target: null,
    articleId: Number(route.params.id)
})
const replyWriteHandler = (id, holder) => {
    placeholder.value = '@' + holder
    const editor = document.getElementById('md-editor-v3-textarea')
    comment.target = id
    editor.focus()
}
const replyCancelTrigger = () => {
    comment.target = null
    placeholder.value = '在此处编辑评论内容'
    comment.content = ''
}
const sendCommentTrigger = async () => {
    const { code } = await commentPost(comment)
    if (code > 0) {
        location.reload()
    }
}
provide('reply', replyWriteHandler)
</script>
<template>
    <div class='post-comments' bg-container>
        <div border='t border-light dark:border-dark'></div>
        <div m='5' font='500' text='6' text-strong>评论</div>
        <editor v-model='comment.content' :placeholder='placeholder' data-aos='fade-up' />
        <div data-aos='fade-up' m='y-6' flex-end>
            <v-btn m='x-4' @click='replyCancelTrigger' v-if='comment.target' variant='flat' bg-danger>
                <span text-light>{{ $t(`button.cancel`) }}</span>
            </v-btn>
            <v-btn v-if='user' @click='sendCommentTrigger' variant='flat' bg-primary>
                <span text-light>{{ $t(`button.send`) }}</span>
            </v-btn>
            <v-btn variant='flat' v-else bg-primary>
                <span text-light>{{ $t(`button.login`) }}</span>
            </v-btn>
        </div>
        <div border='t border-light dark:border-dark'></div>
        <comment-wrapper v-for='comment in comments' :comment='comment' />
    </div>
</template>


<style scoped>
.post-comments {
    padding-left: 12px;
    padding-right: 12px;
}
</style>
