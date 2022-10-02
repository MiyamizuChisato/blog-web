<script setup>
import { computed, onMounted, ref } from 'vue'
import parser from '../plugins/markdown.js'

const props = defineProps({
    markdown: String
})
const html = computed(() => {
    return parser(props.markdown)
})
</script>
<template>
    <div class='markdown-viewer'>
        <div id='md-editor-v3' class='md md-previewOnly'>
            <div class='md-content'>
                <div id='md-editor-v3-preview-wrapper' class='md-preview-wrapper'>
                    <article ref='article' id='md-editor-v3-preview' class='md-preview default-theme'
                             v-html='html' bg='!transparent'>
                    </article>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.md-content .md-preview-wrapper {
    overflow: hidden;
}
</style>
