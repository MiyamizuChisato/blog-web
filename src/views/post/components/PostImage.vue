<script setup>
import { computed } from 'vue'

const props = defineProps({
    image: String
})
const url = computed(() => `url(${props.image})`)
</script>
<template>
    <div data-aos='zoom-in' m='lg:t-6' border='lg:rounded-t-md' class='post-image'>
        <div class='mask'></div>
    </div>
</template>
<style scoped>
.post-image {
    overflow: hidden;
    aspect-ratio: 1.777778;
    background-size: cover;
    background-image: v-bind(url);
}

.mask {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    pointer-events: none;
    background: rgba(0, 0, 0, 0.2);
}
</style>
