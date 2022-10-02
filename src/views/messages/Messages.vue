<script setup>
import onLoadFinished from '../../hooks/onLoadFinished.js'
import Editor from '../../components/Editor.vue'
import { useAppStore } from '../../store/appStore.js'
import { computed, provide, reactive, ref } from 'vue'
import { useMessageStore } from '../../store/messageStore'
import MessageWrapper from './components/MessageWrapper.vue'
import { useUserStore } from '../../store/userStore.js'
import MessageLoad from './components/MessageLoad.vue'
import { messagePost } from '../../api/messageApi.js'

const appStore = useAppStore()
const userStore = useUserStore()
const messageStore = useMessageStore()
const user = computed(() => userStore.user)
const loading = computed(() => appStore.loading)
const messages = computed(() => messageStore.page.content)
const placeholder = ref('在此处编辑留言内容')
const message = reactive({
    content: '',
    target: null
})
const replyWriteHandler = (id, holder) => {
    placeholder.value = '@' + holder
    const editor = document.getElementById('md-editor-v3-textarea')
    message.target = id
    editor.focus()
}
const replyCancelTrigger = () => {
    placeholder.value = '在此处编辑留言内容'
    message.target = null
    messages.content = ''
}
onLoadFinished(async () => {
    if (messageStore.page.current <= 0) {
        await messageStore.fetchPage()
    }
})
const sendMessageTrigger = async () => {
    const { code } = await messagePost(message)
    if (code > 0) {
        location.reload()
    }
}
provide('reply', replyWriteHandler)
</script>
<template>
    <div v-if='!loading' id='messages'>
        <editor v-model='message.content' :placeholder='placeholder' data-aos='fade-down' />
        <div p='x-4' data-aos='fade-down' m='y-6' flex='wrap' flex-between>
            <div text='3.2' text-secondary>欢迎留言，博客正在蒸蒸日上，功能逐步完善中</div>
            <div flex='1' flex-end>
                <v-btn m='x-4' @click='replyCancelTrigger' v-if='message.target' variant='flat' bg-danger>
                    <span text-light>{{ $t(`button.cancel`) }}</span>
                </v-btn>
                <v-btn v-if='user' @click='sendMessageTrigger' variant='flat' bg-primary>
                    <span text-light>{{ $t(`button.send`) }}</span>
                </v-btn>
                <v-btn variant='flat' v-else bg-primary>
                    <span text-light>{{ $t(`button.login`) }}</span>
                </v-btn>
            </div>
        </div>
        <div bg-container>
            <message-wrapper v-for='message in messages' :message='message' />
        </div>
        <message-load />
    </div>
</template>

<style scoped>
#messages {
    margin: 24px auto;
    max-width: 720px;
}
</style>
