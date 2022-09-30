<template>
    <div class='markdown-editor markdown-viewer' overflow='hidden' bg-container>
        <md-editor v-model='text' :toolbars='toolbars' :historyLength='0'
                   h='!180px' border='!none' placeholder='请在这里编辑你的内容'>
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

<script lang='ts' setup>
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { computed, ref } from 'vue'

const props = defineProps({
    content: String
})
const NormalToolbar = MdEditor.NormalToolbar
const preview = ref(false)
const previewToggle = () => {
    preview.value = !preview.value
}
const text = ref(props.content)
const previewDisplay = computed(() => {
    if (preview.value) {
        return {
            editor: 'none',
            preview: 'block',
            icon: 'i-mdi-file-document-edit',
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

</script>

<style>
:root {
    --c-bg-bar: #fff;
    --c-line-bar: rgb(245, 245, 245);
    --c-select-bar: rgba(235, 235, 235, 1)
}

html.dark {
    --c-bg-bar: #3e4550;
    --c-line-bar: rgba(0, 0, 0, 0);
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
}

.markdown-editor .md-toolbar-wrapper {
    height: 42px;
    background-color: var(--c-bg-bar);
    border-bottom-color: var(--c-line-bar);
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
