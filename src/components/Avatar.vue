<script setup>
defineProps({
    image: String,
    height: String,
    width: String
})
</script>
<template>
    <div>
        <img :src='image' alt='avatar'>
    </div>
</template>
<style scoped>
div {
    display: flex;
    overflow: hidden;
    border-radius: 50%;
    align-items: center;
    width: v-bind(width);
    height: v-bind(height);
    justify-content: center;
    min-width: v-bind(width);
    min-height: v-bind(height);
}

img {
    object-fit: cover;
    height: v-bind(height);
    width: v-bind(width);
    min-width: v-bind(width);
    min-height: v-bind(height);
    image-rendering: -moz-crisp-edges; /* Firefox */
    image-rendering: -o-crisp-edges; /* Opera */
    image-rendering: crisp-edges;
}
</style>
