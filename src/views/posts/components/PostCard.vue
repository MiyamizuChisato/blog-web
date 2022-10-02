<script setup>
import { inject } from 'vue'
import { timeFormat } from '../../../utils/time.js'

defineProps({
    post: Object
})
const oss = inject('oss')
</script>
<template>
    <div class='post-card' flex='md:row col' select='none' bg-container>
        <div class='image-box' :style='`background-image:url(${oss+post.image})`'>
        </div>
        <div class='content-box' p='md:10 lt-md:3' bg-container>
            <div data-aos='fade-up' cursor='pointer' text='5' line='md:clamp-2 clamp-1' text-strong>
                {{ post.title }}
            </div>
            <div data-aos='fade-up' position='lt-md:absolute' w='full' bottom='lt-md:16' left='0'
                 p='x-4' display='flex' justify='between' text='!lt-md:light-200 3' text-secondary>
                <div>{{ timeFormat(post.createTime) }}</div>
                <div flex-center>
                    <div m='x-1' flex-center>
                        <i m='x-1' i-heroicons-solid-lightning-bolt />
                        <span m='x-1'>{{ post.watch }}</span>
                    </div>
                    <div m='x-1' flex-center>
                        <i m='x-1' i-mdi-comment-minus />
                        <span m='x-1'>{{ post.comments.length }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media screen and (min-width: 768px) {
    .content-box {
        width: 50%;
    }

    .image-box {
        width: 50%;
        aspect-ratio: 4/3;
    }

    .post-card:hover .image-box::after {
        background: rgba(0, 0, 0, 0.2);
    }

    .post-card:hover .image-box {
        transform: scale(1.05);
    }

    .post-card:hover .content-box {
        transform: translateX(-12px);
    }
}

@media screen and (max-width: 768px) {
    .image-box {
        aspect-ratio: 16/9;
    }

    .content-box {
        width: 100%;
    }

    .image-box {
        width: 100%;
    }

    .image-box::after {
        background: linear-gradient(180deg, rgba(49, 49, 48, 0), rgba(22, 29, 39, 0.8));
    }
}

.post-card {
    max-width: 800px;
    display: flex;
    overflow: hidden;
    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
}


.image-box {
    user-select: none;
    position: relative;
    background-size: cover;
    transition-delay: 100ms;
    background-position: center;
    transition: transform 200ms ease-in-out;
}

.image-box::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    transition-delay: 100ms;
    transition: background-color 200ms ease-in-out;
}

.content-box {
    display: flex;
    flex-direction: column;
    transition-delay: 100ms;
    position: relative;
    justify-content: space-between;
    transition: transform 200ms ease-in-out;
}
</style>
