<script setup>
import Viewer from './Viewer.vue'
import Avatar from './Avatar.vue'
import { defineProps } from 'vue'

defineProps({
    reply: {
        default: true
    }
})
const text = `
差不多得了屁大点事都要拐上原神，原神一没招你惹你，二没干伤天害理的事情，到底怎么你了让你一直无脑抹黑，米哈游每天费尽心思的文化输出弘扬中国文化，你这种喷子只会在网上敲键盘诋毁良心公司，中国游戏的未来就是被你这种人毁掉的
`
</script>
<template>
    <div m='3' p='3' v-ripple>
        <div m='b-3' data-aos='fade-up' v-if='reply' text-strong>回复 <span text-warning>&nbsp;&nbsp;@Tisato</span></div>
        <div data-aos='fade-up' flex-between>
            <div flex-center>
                <div>
                    <avatar
                        width='36px'
                        height='36px'
                        image='/src/assets/images/banner.png' />
                </div>
                <div m='x-3'>
                    <div text-strong>
                        Tisato
                    </div>
                    <div text='3' text-normal>2022-01-02</div>
                </div>
            </div>
            <div>
                <v-btn size='small' variant='text'>
                    <span text='3' text-strong>回复</span>
                </v-btn>
            </div>
        </div>
        <viewer :markdown='text' />
    </div>
</template>


<style scoped>

</style>
