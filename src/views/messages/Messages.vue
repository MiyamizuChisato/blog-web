<script setup>
import onLoadFinished from '../../hooks/onLoadFinished.js'
import Editor from '../../components/Editor.vue'
import Comment from '../../components/Comment.vue'
import { useAppStore } from '../../store/appStore.js'
import { computed } from 'vue'

const appStore = useAppStore()
const loading = computed(() => appStore.loading)
onLoadFinished(() => {
})
</script>
<template>
    <div v-if='!loading' w='md:720px' m='x-auto y-6'>
        <editor data-aos='fade-down' />
        <div p='x-4' data-aos='fade-down' m='y-6' flex='wrap' flex-between>
            <div text='3.2' text-secondary>欢迎留言，博客正在蒸蒸日上，功能逐步完善中</div>
            <div flex='1' flex-end>
                <v-btn v-if='false' variant='flat' bg-primary>
                    <span text-light>登录</span>
                </v-btn>
                <v-btn v-if='true' variant='flat' bg-primary>
                    <span text-light>提交</span>
                </v-btn>
            </div>
        </div>
        <div bg-container>
            <comment v-for='i in 5' />
        </div>
    </div>
</template>


<style scoped>

</style>
