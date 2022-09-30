<script setup>
import onLoadFinished from '../../hooks/onLoadFinished.js'
import { ref } from 'vue'

const snackbar = ref(true)
onLoadFinished(() => {
})
</script>
<template>
    <v-snackbar :timeout='-1' v-model='snackbar' :vertical='true'>
        <div>
            这个页面还在准备中，你的友链将在准备完成后添加到该页面
        </div>
        <template #actions>
            <v-btn variant='text' @click='snackbar = false'>
                <span text-primary>关闭</span>
            </v-btn>
        </template>
    </v-snackbar>
</template>


<style scoped>

</style>
