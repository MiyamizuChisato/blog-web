<script setup>
import { go } from '../../utils/router.js'
import { inject } from 'vue'

const toggle = inject('menu')
</script>
<template>
    <v-btn-toggle :model-value='toggle' flex='col' rounded='0' selected-class='selected' w='!full' h='!full' mandatory>
        <v-btn @click='go("/")' :block='true' value='index' height='40' bg='!transparent' m='y-2' class='drawer-btn'
               text-strong>
            <i position='absolute' left='10' text='5' i-mdi-home-variant />
            {{ $t(`menu.index`) }}
        </v-btn>
        <v-btn @click='go("/posts")' value='posts' :block='true' height='40' bg='!transparent' m='y-2'
               class='drawer-btn'
               text-strong>
            <i position='absolute' left='10' text='5' i-ri-book-read-fill />
            {{ $t(`menu.posts`) }}
        </v-btn>
        <v-btn @click='go("/messages")' value='messages' :block='true' height='40' bg='!transparent' m='y-2'
               class='drawer-btn'
               text-strong>
            <i position='absolute' left='10' text='5' i-ri-message-3-fill />
            {{ $t(`menu.messages`) }}
        </v-btn>
        <v-btn @click='go("/friends")' value='friends' :block='true' height='40' bg='!transparent' m='y-2'
               class='drawer-btn'
               text-strong>
            <i position='absolute' left='10' text='5' i-mdi-nature-people />
            {{ $t(`menu.friends`) }}
        </v-btn>
    </v-btn-toggle>
</template>


<style scoped>
.drawer-btn {
    border-radius: 9999px !important;
}
</style>
