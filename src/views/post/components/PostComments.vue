<script setup>
import Comment from '../../../components/Comment.vue'
import Editor from '../../../components/Editor.vue'
</script>
<template>
    <div class='post-comments' bg-container>
        <div style='border-top: 1px solid var(--c-border)'></div>
        <div m='5' font='500' text='6' text-strong>评论</div>
        <editor data-aos='fade-up' />
        <div data-aos='fade-up' m='y-6' flex-end>
            <div>
                <v-btn v-if='false' variant='flat' bg-primary>
                    <span text-light>登录</span>
                </v-btn>
                <v-btn v-if='true' variant='flat' bg-primary>
                    <span text-light>提交</span>
                </v-btn>
            </div>
        </div>
        <div style='border-top: 1px solid var(--c-border)'></div>
        <comment v-for='i in 4' />
    </div>
</template>


<style scoped>
.post-comments {
    padding-left: 12px;
    padding-right: 12px;
}
</style>
