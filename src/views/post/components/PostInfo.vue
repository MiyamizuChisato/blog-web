<script setup>
import Avatar from '../../../components/Avatar.vue'
import { inject } from 'vue'
import { timeFormat } from '../../../utils/time.js'

const master = inject('master')
const oss = inject('oss')
defineProps({
    title: String,
    time: String,
    watch: Number
})
</script>
<template>
    <h1 data-aos='fade-up' font='400' text='7.5' text-strong>{{ title }}</h1>
    <div data-aos='fade-up' p='y-7' text-strong flex-between>
        <div display='flex'>
            <avatar width='48px' height='48px' :image='oss+master.avatar' />
            <div m='x-3'>
                <div text='5'>{{ master.nickname }}</div>
                <div text='3' text-normal>{{ timeFormat(time) }}</div>
            </div>
        </div>
        <div flex-center>
            <i m='x-2' i-heroicons-solid-lightning-bolt />
            <span>{{ watch }}</span>
        </div>
    </div>
</template>
<style scoped>

</style>
