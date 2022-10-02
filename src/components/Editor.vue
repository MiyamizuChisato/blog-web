<script setup>
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { computed, ref, watch } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    }
})
const emits = defineEmits(['update:modelValue'])
const NormalToolbar = MdEditor.NormalToolbar
const preview = ref(false)
const previewToggle = () => {
    preview.value = !preview.value
}
const previewDisplay = computed(() => {
    if (preview.value) {
        return {
            editor: 'none',
            preview: 'block',
            icon: 'i-mdi-file-edit',
            mode: '预览',
            iconTitle: '编辑'
        }
    }
    return {
        editor: 'block',
        preview: 'none',
        icon: 'i-mdi-eye',
        mode: '编辑',
        iconTitle: '预览'
    }
})
const toolbars = ['bold', 'underline', 'italic', 'strikeThrough', 'sup', 'sub', 0]
const text = computed({
    get: () => props.modelValue,
    set: (value) => emits('update:modelValue', value)
})
</script>
<template>
    <div class='markdown-editor markdown-viewer' overflow='hidden' bg-container>
        <md-editor v-model='text' :toolbars='toolbars' :historyLength='0'
                   h='!180px' border='!none' :placeholder='placeholder'>
            <template #defToolbars>
                <normal-toolbar :title='previewDisplay.iconTitle' @on-click='previewToggle'>
                    <template #trigger>
                        <div h='24px' w='24px' flex-center>
                            <i text='5' :class='previewDisplay.icon' text-secondary />
                        </div>
                    </template>
                </normal-toolbar>
            </template>
        </md-editor>
    </div>
</template>
<style>
:root {
    --c-bg-bar: #fff;
    --c-select-bar: rgba(235, 235, 235, 1)
}

html.dark {
    --c-bg-bar: #3e4550;
    --c-select-bar: rgba(255, 255, 255, 0.1)
}

.markdown-editor {
    overflow: hidden;
}

.markdown-editor #md-editor-v3-preview-wrapper {
    background-color: var(--c-border);
}

.markdown-editor .md-preview-wrapper {
    display: v-bind(previewDisplay ['preview']) !important;
}

.markdown-editor .md-input-wrapper {
    display: v-bind(previewDisplay ['editor']) !important;
}

.markdown-editor #md-editor-v3-textarea {
    padding: 10px;
    font-size: 14px;
    line-height: 1.5;
    overflow-y: auto;
    border-top: none;
}

.markdown-editor .md-toolbar-wrapper {
    height: 42px;
    background-color: var(--c-bg-bar);
    border-bottom-color: var(--c-border);
}

.markdown-editor .md-toolbar {
    min-width: 0 !important;
}

.markdown-editor .md-footer {
    display: none;
}

.markdown-editor ::-webkit-scrollbar-thumb {
    background-color: var(--c-scrollbar) !important;
}

.markdown-editor ::-webkit-scrollbar-track {
    background-color: var(--c-container) !important;
}

.markdown-editor .md-toolbar-item {
    padding: 3px;
    margin: 0 2px;
    border-radius: 4px !important;
}

.markdown-editor .md-toolbar-item:hover {
    background-color: var(--c-select-bar)
}

.markdown-editor #md-editor-v3-preview {
    padding: 0 10px;
}
</style>
