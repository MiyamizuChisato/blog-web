<script setup>
import Account from './Account.vue'
import { headerControl } from '../../hooks/HeaderControl.js'
import { useRoute, useRouter } from 'vue-router'
import { computed, inject, provide, ref } from 'vue'
import Avatar from '../../components/Avatar.vue'
import { go } from '../../utils/router.js'
import { useUserStore } from '../../store/userStore.js'
import HeaderMenu from './HeaderMenu.vue'
import DrawerMenu from './DrawerMenu.vue'

const oss = inject('oss')
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const menu = ref(route.name)
const drawer = ref(false)
const accountRef = ref(null)
const user = computed(() => userStore.user)
const showHeader = headerControl()
const exitTrigger = () => {
    accountRef.value.exit()
}
const themeModeToggleTrigger = () => {
    document.documentElement.classList.toggle('dark')
}
const loginDialogOpenTrigger = () => {
    accountRef.value.dialogOpenTrigger()
    drawer.value = false
}
provide('menu', menu)
</script>
<template>
    <header :class='showHeader?`top-0`:`top--20`' text-strong>
        <div display='xl:none' position='absolute' left='4'>
            <v-btn @click='router.back' v-show='route.name === `post`' size='small' variant='text' icon>
                <i text='5' i-heroicons-solid-arrow-left />
            </v-btn>
        </div>
        <div position='xl:absolute' left='20' text='5'>CIALLO</div>
        <div display='lt-xl:none'>
            <header-menu />
        </div>
        <div display='lt-xl:none flex' position='absolute' items='center' right='20'>
            <div m='x-2'>
                <v-btn @click='themeModeToggleTrigger' variant='text'>
                    <i text='6' i-line-md-light-dark-loop />
                </v-btn>
            </div>
            <div m='x-2'></div>
            <div m='x-2'>
                <account ref='accountRef' />
            </div>
        </div>
        <div display='xl:none' position='absolute' right='4'>
            <v-btn @click='drawer = true' size='small' variant='text' icon>
                <i text='5' i-heroicons-solid-menu />
            </v-btn>
        </div>
    </header>
    <v-navigation-drawer width='256' v-model='drawer' :temporary='true' text-strong bg-container>
        <div p='3' flex-between>
            <v-btn @click='themeModeToggleTrigger' size='small' variant='text'>
                <i text='6' i-line-md-light-dark-loop />
            </v-btn>
            <v-btn size='small' variant='text'>
                <i text='6' i-mdi-translate />
            </v-btn>
        </div>
        <div m='y-6' flex-center>
            <div v-if='user'>
                <avatar @click='go(`/user/${user.id}`)' :image='oss+user.avatar' width='80px' height='80px' />
                <div font='500' m='y-5' text='5' flex-center>{{ user.nickname }}</div>
            </div>
            <div text='8' p='y-10' v-else>CIALLO</div>
        </div>
        <div border='rounded-t-6' w='full' p='3' position='absolute' bottom='0' bg-screen>
            <div m='t-6 b-40 x-4'>
                <drawer-menu />
            </div>
            <v-btn v-if='user' @click='exitTrigger' block bg-danger>
                <span text-light>{{ $t(`button.exit`) }}</span>
            </v-btn>
            <v-btn @click='loginDialogOpenTrigger' v-else block bg-primary>
                <span text-light>{{ $t(`button.login`) }}</span>
            </v-btn>
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
</style>
