<script setup>
import { useAppStore } from '../store/appStore.js'
import { computed } from 'vue'

const appStore = useAppStore()
const loading = computed(() => appStore.loading)
</script>
<template>
    <transition>
        <div v-if='loading' class='loading'>
        </div>
    </transition>
</template>

<style scoped>
.loading {
    background-color: var(--c-screen);
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
}

.v-enter-active,
.v-leave-active {
    opacity: 1;
    transition: opacity 400ms ease-in-out;
}

.v-enter-from {
    opacity: 1;
}

.v-leave-to {
    opacity: 0;
}
</style>
