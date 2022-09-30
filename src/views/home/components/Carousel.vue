<script setup>
import { useDisplay } from 'vuetify'
import { computed } from 'vue'

const { mobile } = useDisplay()
const height = computed(() => {
    return mobile.value ? 480 : 600
})
</script>
<template>
    <v-carousel interval='4000' class='carousel' :height='height' delimiter-icon='i-mdi-cloud'
                :show-arrows='false' :hide-delimiter-background='true' :cycle='true'>
        <v-carousel-item>
            <div h='full' bg-success>
            </div>
        </v-carousel-item>
        <v-carousel-item>
            <div h='full' bg-primary>

            </div>
        </v-carousel-item>
        <v-carousel-item>
            <div h='full' bg-danger>

            </div>
        </v-carousel-item>
        <v-carousel-item>
            <div h='full' bg-warning>

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
    color: var(--c-secondary);
}
</style>
