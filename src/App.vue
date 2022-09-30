<script setup>
import { onMounted } from 'vue'
import Aos from 'aos'
import Loading from './components/Loading.vue'

onMounted(() => {
    Aos.init({
        once: true,
        duration: 1000,
        offset: 0
    })
})
</script>

<template>
    <v-app bg-screen>
        <router-view />
    </v-app>
    <loading />
</template>

<style scoped>

</style>
