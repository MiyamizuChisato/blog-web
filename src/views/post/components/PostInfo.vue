<script setup>
import Avatar from '../../../components/Avatar.vue'
</script>
<template>
    <h1 data-aos='fade-up' font='400' text='7.5' text-strong>差不多得了，什么事都要扯上原神是吧</h1>
    <div data-aos='fade-up' p='y-7' text-strong flex-between>
        <div display='flex'>
            <div>
                <avatar
                    width='48px'
                    height='48px'
                    image='/src/assets/images/banner.png' />
            </div>
            <div m='x-3'>
                <div text='5'>Tisato</div>
                <div text='3' text-normal>六月 24, 2021</div>
            </div>
        </div>
        <div flex-center>
            <i m='x-2' i-heroicons-solid-lightning-bolt />
            <span>1024</span>
        </div>
    </div>
</template>
<style scoped>

</style>
