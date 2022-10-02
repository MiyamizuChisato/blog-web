<script setup>
import { go } from '../../utils/router.js'
import { inject } from 'vue'

const toggle = inject('menu')
</script>
<template>
    <v-btn-toggle :model-value='toggle' h='!54px' rounded='0' selected-class='selected' mandatory>
        <v-btn @click='go("/")' value='index' bg='!transparent' m='!x-2' p='!x-8'>
                    <span text-strong>
                        {{ $t(`menu.index`) }}
                    </span>
        </v-btn>
        <v-btn @click='go("/posts")' value='posts' bg='!transparent' m='!x-2' p='!x-8'>
                    <span text-strong>
                        {{ $t(`menu.posts`) }}
                    </span>
        </v-btn>
        <v-btn @click='go("/messages")' value='messages' bg='!transparent' m='!x-2' p='!x-8'>
                    <span text-strong>
                        {{ $t(`menu.messages`) }}
                    </span>
        </v-btn>
        <v-btn @click='go("/friends")' value='friends' bg='!transparent' m='!x-2' p='!x-8'>
                    <span text-strong>
                        {{ $t(`menu.friends`) }}
                    </span>
        </v-btn>
    </v-btn-toggle>
</template>

