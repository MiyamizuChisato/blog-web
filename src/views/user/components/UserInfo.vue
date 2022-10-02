<script setup>
import { inject } from 'vue'

const user = inject('user')
</script>
<template>
    <v-list>
        <v-list-item class='info-item'>
            <div border='red' display='flex' items='center' justify='between' text-normal>
                <div display='flex' items='center'>
                    <i text='5' i-mdi-card-text text-primary />
                    <div m='x-2'>身份标签</div>
                </div>
                <div>
                    {{ $t(`user.identity.${user.identity.id}`) }}
                </div>
            </div>
        </v-list-item>
        <v-list-item class='info-item'>
            <div display='flex' items='center' justify='between' text-normal>
                <div display='flex' items='center'>
                    <i text='5' i-mdi-timer text-danger />
                    <div m='x-2'>注册时间</div>
                </div>
                <div>
                    {{ user.createTime.substring(0, 10) }}
                </div>
            </div>
        </v-list-item>
    </v-list>
</template>


<style scoped>
</style>
