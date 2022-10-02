<script setup>
import Comment from '../../../components/Comment.vue'
import { ref } from 'vue'
import { subCommentGetByCommentId } from '../../../api/commentApi.js'

const props = defineProps({
    comment: Object
})
const show = ref(false)
const loading = ref(false)
const subComments = ref(null)
const checkSubCommentTrigger = async () => {
    if (subComments.value !== null) {
        show.value = true
        return
    }
    loading.value = true
    const { code, data } = await subCommentGetByCommentId(props.comment.id)
    if (code > 0) {
        subComments.value = data
        loading.value = false
        show.value = true
    }
}
</script>
<template>
    <div class='comment'>
        <comment :comment='comment' />
        <div v-if='show' m='l-4'>
            <comment v-for='comment in subComments' :comment='comment' />
        </div>
        <div v-if='comment.children > 0' data-aos='fade-up' class='reply' text-strong>
            <span class='line'></span>
            <v-btn @click='checkSubCommentTrigger' v-if='!show ' :loading='loading' variant='text'>
                <span>查看{{ comment.children }}条回复</span>
            </v-btn>
            <v-btn @click='show = false' v-if='show' variant='text'>
                <span>收起回复</span>
            </v-btn>
        </div>
    </div>
</template>
<style scoped>
.comment {
    overflow: hidden;
    border-bottom: 1px solid var(--c-border);
}

.comment:last-child {
    border-bottom-color: transparent;
}

.comment .reply {
    padding-left: 60px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
}

.comment .reply .line {
    display: block;
    width: 30px;
    height: 100%;
    border-top: 1px solid var(--c-secondary);
    margin: 10px;
}
</style>
