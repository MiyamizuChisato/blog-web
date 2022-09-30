<script setup>
import PostCard from './components/PostCard.vue'
import onLoadFinished from '../../hooks/onLoadFinished.js'
import { go } from '../../utils/router.js'
import { useAppStore } from '../../store/appStore.js'
import { computed } from 'vue'

const appStore = useAppStore()
const loading = computed(() => appStore.loading)
onLoadFinished(() => {
})
</script>
<template>
    <div v-if='!loading' id='posts' w='xl:1200px' m='x-auto y-6' p='lt-lg:x-3'>
        <v-row :no-gutters='true'>
            <v-col cols='12' lg='8'>
                <div v-for='i in 6' class='post-wrapper' m='x-auto b-6'>
                    <post-card @click='go(`/post/${i}`)' />
                </div>
            </v-col>
            <v-col cols='4' display='lt-lg:none'>
                <div h='20vh' m='x-9' bg-container>
                </div>
            </v-col>
        </v-row>
    </div>
</template>


<style scoped>
.post-wrapper {
    max-width: 800px;
}
</style>
