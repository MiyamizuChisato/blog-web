<script setup>
import { inject, ref } from 'vue'
import Avatar from '../../../components/Avatar.vue'

const oss = inject('oss')
const master = inject('master')
const navigate = (href) => {
    window.open(href)
}
const dialog = ref(false)
</script>
<template>
    <div v-if='master' border='rounded-md' p='y-6 x-2' bg-container>
        <v-card-title data-aos='fade-up'>
            <div display='flex' items='center' flex='lt-md:col'>
                <avatar :image='oss+master.avatar' width='88px' height='88px' />
                <div m='x-4'>
                    <div text='center'>
                        <span text='6' text-strong>{{ master.nickname }}</span>
                        <span m='x-2' text='5' font='400' text-secondary>[ちさと]</span>
                    </div>
                    <div text='4' font='400' text-secondary>Developer / Blogger / Gamer</div>
                </div>
                <div m='lt-md:y-4' flex='1' flex-end>
                    <v-btn m='r-2' @click='navigate("https://github.com/MiyamizuChisato")' variant='flat' size='small'
                           icon bg-success text-light>
                        <i text='5' i-mdi-github />
                    </v-btn>
                    <v-btn m='r-2' @click='navigate("https://steamcommunity.com/id/Inxposed/")' variant='flat'
                           size='small' icon bg-danger text-light>
                        <i text='5' i-mdi-steam />
                    </v-btn>
                    <v-btn m='r-2' @click='dialog = true' variant='text' size='small' icon bg-primary text-light>
                        <i text='5' i-mdi-sony-playstation />
                    </v-btn>
                </div>
            </div>
        </v-card-title>
        <v-card-subtitle data-aos='fade-up' class='subtitle'>
            <p w='100%' text='center' text-secondary>
                我们所度过的每个平凡的日常，也许就是连续发生的奇迹。
            </p>
        </v-card-subtitle>
        <v-card-text>
            <v-card-item data-aos='fade-up'>
                <div display='flex' text='4' text-normal>
                    <div font='500' text-strong>我是</div>
                    <div m='l-4' flex='1'>
                        <p m='b-2'>
                            来自四川的大学四年级学生Tisato，对程序设计和游戏还有动画很感兴趣;
                        </p>
                        <p m='b-2'>
                            一位网站的博主，在维护和更新自己的独立网站，会一点霓虹语，时不时写出一些废话;
                        </p>
                        <p m='b-2'>
                            一个求职者。
                        </p>
                    </div>
                </div>
            </v-card-item>
            <v-card-item data-aos='fade-up'>
                <div display='flex' text='4' text-normal>
                    <div font='500' text-strong>我用</div>
                    <div m='l-4' flex='1' text-light>
                        <span display='inline-block' border='rounded-sm' m='r-2 b-2' p='x-2 y-1' select='none' v-ripple
                              bg-primary>
                            Java
                        </span>
                        <span display='inline-block' border='rounded-sm' m='r-2 b-2' p='x-2 y-1' select='none' v-ripple
                              bg-danger>
                            JavaScript
                        </span>
                        <span display='inline-block' border='rounded-sm' m='r-2 b-2' p='x-2 y-1' select='none' v-ripple
                              bg-success>
                            Vue
                        </span>
                        <span display='inline-block' border='rounded-sm' m='r-2 b-2' p='x-2 y-1' select='none' v-ripple
                              bg-warning>
                            Python
                        </span>
                        <span display='inline-block' border='rounded-sm' m='r-2 b-2' p='x-2 y-1' bg='blue' select='none'
                              v-ripple>
                            PlayStation
                        </span>
                        <span display='inline-block' border='rounded-sm' m='r-2 b-2' p='x-2 y-1' bg='teal' select='none'
                              v-ripple>
                            Steam
                        </span>
                    </div>
                </div>
            </v-card-item>
            <v-card-item data-aos='fade-up'>
                <div display='flex' text='4' text-normal>
                    <div font='500' text-strong>我会</div>
                    <div m='l-4' flex='1'>
                        <div flex-center>
                            <span m='r-8'>游戏</span>
                            <v-progress-linear flex='1' model-value='60' height='10' rounded text-success />
                        </div>
                        <div flex-center>
                            <span m='r-8'>前端</span>
                            <v-progress-linear flex='1' model-value='40' height='10' rounded text-success />
                        </div>
                        <div flex-center>
                            <span m='r-8'>后端</span>
                            <v-progress-linear flex='1' model-value='70' height='10' rounded text-success />
                        </div>
                        <div flex-center>
                            <span m='r-8'>社交</span>
                            <v-progress-linear flex='1' model-value='20' height='10' rounded text-success />
                        </div>
                        <div flex-center>
                            <span m='r-8'>创作</span>
                            <v-progress-linear flex='1' model-value='30' height='10' rounded text-success />
                        </div>
                    </div>
                </div>
            </v-card-item>
        </v-card-text>
    </div>
    <v-dialog v-model='dialog'>
        <div w='300px' m='x-auto' p='6' text-normal bg-container>
            PSN ID : <span text='5' text-primary> MiyamizuCh1sato</span><br>
            好友扩列，一起打游戏！
        </div>
    </v-dialog>
</template>


<style scoped>
.subtitle {
    white-space: break-spaces;
}
</style>
