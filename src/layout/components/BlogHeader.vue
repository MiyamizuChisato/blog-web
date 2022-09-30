<script setup>
import Account from './Account.vue'
import { headerControl } from '../../hooks/HeaderControl.js'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import Avatar from '../../components/Avatar.vue'
import { go } from '../../utils/router.js'

const showHeader = headerControl()
const route = useRoute()
const router = useRouter()
const routes = useRouter().options.routes[0].children
const drawer = ref(false)
const toggle = ref(route.name)
const themeModeToggle = () => {
    document.documentElement.classList.toggle('dark')
}

</script>
<template>
    <header :class='showHeader?`top-0`:`top--20`' text-strong>
        <div position='xl:absolute' left='20' text='5'>CIALLO</div>
        <div display='lt-xl:none'>
            <v-btn-toggle :model-value='toggle' h='!54px' rounded='0' selected-class='selected' mandatory>
                <template v-for='route in routes'>
                    <v-btn @click='router.push(route.path)' v-if='route.meta.menu' :value='route.name' bg='!transparent'
                           m='!x-2' p='!x-8'>
                        <span text-strong>
                            {{ $t(`menu.${route.name}`) }}
                        </span>
                    </v-btn>
                </template>
            </v-btn-toggle>
        </div>
        <div display='lt-xl:none flex' position='absolute' right='20'>
            <div m='x-2'>
                <v-btn @click='themeModeToggle' variant='text'>
                    <i text='6' i-line-md-light-dark-loop />
                </v-btn>
            </div>
            <div m='x-2'></div>
            <div m='x-2'>
                <account />
            </div>
        </div>
        <div display='xl:none' position='lt-xl:absolute' right='4'>
            <v-btn @click='drawer = true' size='small' variant='text' icon>
                <i text='5' i-heroicons-solid-menu />
            </v-btn>
        </div>
    </header>
    <v-navigation-drawer width='256' v-model='drawer' :temporary='true' text-strong bg-container>
        <div p='3' flex-between>
            <v-btn @click='themeModeToggle' size='small' variant='text'>
                <i text='6' i-line-md-light-dark-loop />
            </v-btn>
            <v-btn size='small' variant='text'>
                <i text='6' i-mdi-translate />
            </v-btn>
        </div>
        <div m='y-6' flex-center>
            <avatar
                width='80px'
                height='80px'
                image='/src/assets/images/banner.png' />
        </div>
        <div font='500' text='5' flex-center>Tisato</div>
        <div p='10' m='y-10' bg-screen>
            <v-btn-toggle :model-value='toggle' flex='col' rounded='0' selected-class='selected'
                          w='!full' h='!full' mandatory>
                <v-btn value='index' :block='true' @click='go("/")' height='40' bg='!transparent' m='y-2'
                       style='border-radius:9999px' text-strong>
                    <i position='absolute' left='10' text='5' i-mdi-home-variant />
                    {{ $t(`menu.index`) }}
                </v-btn>
                <v-btn value='posts' :block='true' @click='go("/posts")' height='40' bg='!transparent' m='y-2'
                       style='border-radius:9999px' text-strong>
                    <i position='absolute' left='10' text='5' i-ri-book-read-fill />
                    {{ $t(`menu.posts`) }}
                </v-btn>
                <v-btn value='messages' :block='true' @click='go("/messages")' height='40' bg='!transparent' m='y-2'
                       style='border-radius:9999px' text-strong>
                    <i position='absolute' left='10' text='5' i-ri-message-3-fill />
                    {{ $t(`menu.messages`) }}
                </v-btn>
                <v-btn value='friends' :block='true' @click='go("/friends")' height='40' bg='!transparent' m='y-2'
                       style='border-radius:9999px' text-strong>
                    <i position='absolute' left='10' text='5' i-mdi-nature-people />
                    {{ $t(`menu.friends`) }}
                </v-btn>
            </v-btn-toggle>
        </div>
    </v-navigation-drawer>
</template>
<style scoped>
header {
    z-index: 2;
    height: 54px;
    display: flex;
    transition: top;
    position: sticky;
    align-items: center;
    justify-content: center;
    transition-delay: 111ms;
    transition-duration: 555ms;
    backdrop-filter: blur(20px);
    background-color: var(--c-header);
}

.selected {
    background-color: rgba(255, 255, 255, 0.1) !important;
}

.selected span {
    font-weight: 500;
}
</style>
