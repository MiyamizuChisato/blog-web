<script setup>
import SimpleViewer from './SimpleViewer.vue'
import Avatar from './Avatar.vue'
import { defineProps, inject } from 'vue'

const props = defineProps({
    comment: Object
})
const replyWriteTrigger = () => {
    reply(props.comment.id, props.comment.user.nickname)
}
const oss = inject('oss')
const reply = inject('reply')
</script>
<template>
    <div data-aos='fade-up' m='3' p='3' v-ripple>
        <div flex-between>
            <div flex-center>
                <div>
                    <avatar :image='oss+comment.user.avatar' width='36px' height='36px' />
                </div>
                <div m='x-3'>
                    <div text-strong>
                        {{ comment.user.nickname }}
                    </div>
                    <div text='3' text-normal>{{ comment.createTime.substring(0, 10) }}</div>
                </div>
            </div>
            <div v-if='!comment.target'>
                <v-btn @click='replyWriteTrigger' size='small' variant='text'>
                    <span text='3' text-strong>回复</span>
                </v-btn>
            </div>
        </div>
        <simple-viewer :markdown='comment.content' />
    </div>
</template>


<style scoped>

</style>
