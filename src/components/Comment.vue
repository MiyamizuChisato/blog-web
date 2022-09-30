<script setup>
import SubComment from './SubComment.vue'
</script>
<template>
    <div class='comment'>
        <sub-comment :reply='false' />
        <div m='l-4'>
            <sub-comment />
            <sub-comment />
        </div>
        <div data-aos='fade-up' class='reply' text-strong>
            <span class='line'></span>
            <v-btn v-if='false' variant='text'>
                <span>查看回复</span>
            </v-btn>
            <v-btn v-if='true' variant='text'>
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
