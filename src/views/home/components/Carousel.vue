<script setup>
import { useDisplay } from 'vuetify'
import { computed, inject, onMounted, ref } from 'vue'
import { articleGetCarousel } from '../../../api/articleApi.js'
import { go } from '../../../utils/router.js'

const { mobile } = useDisplay()
const oss = inject('oss')
const height = computed(() => {
    return mobile.value ? 400 : 600
})
const carousels = ref(null)
onMounted(async () => {
    const { code, data } = await articleGetCarousel()
    if (code > 0) {
        carousels.value = data
    }
})
</script>
<template>
    <v-carousel v-if='carousels' interval='4000' class='carousel' :height='height' delimiter-icon='i-mdi-cloud'
                :show-arrows='false' :hide-delimiter-background='true' :cycle='true'>
        <v-carousel-item v-for='(carousel,index) in carousels' :key='index'>
            <div class='carousel-item' h='full' :style='`background-image: url(${oss+carousel.image})`'>
                <div class='carousel-item-mask'></div>
                <div text='8' position='absolute' bottom='20' left='20' text-light>
                    <span>{{ carousel.title }}</span>
                    <div>
                        <v-btn @click='go("/post/"+carousel.id)' rounded='pill' variant='text' bg-danger>
                            <span text-light>开始阅读</span>
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-carousel-item>
    </v-carousel>
    <template>
        123
    </template>
</template>

<style>
.carousel .v-carousel__controls button {
    margin: 0 2px !important;
    font-size: 14px;
    color: #a3a3a3;
}

.carousel-item {
    position: relative;
    background-size: cover;
}

.carousel-item-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(49, 49, 48, 0), rgba(22, 29, 39, .9));
}
</style>
