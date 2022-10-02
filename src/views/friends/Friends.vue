<script setup>
import onLoadFinished from '../../hooks/onLoadFinished.js'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
onLoadFinished(() => {
})
onMounted(() => {
    toast.info('这个页面正在准备中')
})
</script>
<template>
    <div>

    </div>
</template>


<style scoped>

</style>
