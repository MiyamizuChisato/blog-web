<script setup>
import { onMounted, provide, ref } from 'vue'
import Aos from 'aos'
import Loading from './components/Loading.vue'
import { getMaster } from './api/blogApi.js'

const master = ref(null)
onMounted(async () => {
    const { code, data } = await getMaster()
    if (code > 0) {
        master.value = data
    }
    Aos.init({
        once: true,
        duration: 1000,
        offset: 0
    })
})
provide('oss', import.meta.env.VITE_OSS)
provide('master', master)
</script>

<template>
    <v-app bg-screen>
        <router-view />
    </v-app>
    <loading />
</template>

<style scoped>

</style>
