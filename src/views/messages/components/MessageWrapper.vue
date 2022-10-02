<script setup>
import { ref } from 'vue'
import Message from '../../../components/Message.vue'
import { subMessageGetByMessageId } from '../../../api/messageApi.js'

const props = defineProps({
    message: Object
})
const show = ref(false)
const loading = ref(false)
const subMessages = ref(null)
const checkSubMessageTrigger = async () => {
    if (subMessages.value !== null) {
        show.value = true
        return
    }
    loading.value = true
    const { code, data } = await subMessageGetByMessageId(props.message.id)
    if (code > 0) {
        subMessages.value = data
        loading.value = false
        show.value = true
    }
}
</script>
<template>
    <div class='message'>
        <message :message='message' />
        <div v-if='show' m='l-4'>
            <message v-for='message in subMessages' :message='message' />
        </div>
        <div v-if='message.children > 0' data-aos='fade-up' class='reply' text-strong>
            <span class='line'></span>
            <v-btn @click='checkSubMessageTrigger' v-if='!show ' :loading='loading' variant='text'>
                <span>查看{{ message.children }}条回复</span>
            </v-btn>
            <v-btn @click='show = false' v-if='show' variant='text'>
                <span>收起回复</span>
            </v-btn>
        </div>
    </div>
</template>
<style scoped>
.message {
    overflow: hidden;
    border-bottom: 1px solid var(--c-border);
}

.message:last-child {
    border-bottom-color: transparent;
}

.message .reply {
    padding-left: 60px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
}

.message .reply .line {
    display: block;
    width: 30px;
    height: 100%;
    border-top: 1px solid var(--c-secondary);
    margin: 10px;
}
</style>
