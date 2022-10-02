<script setup>
import { useDisplay } from 'vuetify'
import SignUp from './SignUp.vue'
import SignIn from './SignIn.vue'
import { computed, inject, ref } from 'vue'
import { go } from '../../utils/router.js'
import { useUserStore } from '../../store/userStore.js'
import Avatar from '../../components/Avatar.vue'

const oss = inject('oss')
const { mobile } = useDisplay()
const userStore = useUserStore()
const dialog = ref(false)
const register = ref(false)
const user = computed(() => userStore.user)
const exit = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
}
const dialogOpenTrigger = () => {
    register.value = false
    dialog.value = true
}
const onDialogClose = () => {
    dialog.value = false
}
const onDialogToggle = () => {
    register.value = !register.value
}
defineExpose({
    dialogOpenTrigger,
    exit
})
</script>
<template>
    <v-btn v-if='user !== null' color='transparent' flat icon>
        <avatar width='36px' height='36px' :image='oss+user.avatar' />
        <v-menu location='bottom' activator='parent'>
            <v-list shadow='!none' p='!0' m='y-3' bg-container>
                <v-list-item value='account' @click='go(`/user/`+user.id)'>
                    <v-list-item-title>
                        <div display='flex' items='center' text-normal>
                            <i m='x-1' i-mdi-account-circle />
                            <span m='x-1'>{{ $t(`account.mine`) }}</span>
                        </div>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item value='exit' @click='exit'>
                    <v-list-item-title>
                        <div display='flex' items='center' text-normal>
                            <i m='x-1' i-mdi-arrow-left-drop-circle />
                            <span m='x-1'>{{ $t(`account.logout`) }}</span>
                        </div>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-btn>
    <v-btn @click='dialogOpenTrigger' variant='text' v-else bg-primary>
        <span text-light>{{ $t(`button.login`) }}</span>
    </v-btn>
    <v-dialog :fullscreen='mobile' v-model='dialog' transition='dialog-bottom-transition' persistent flex-center>
        <sign-up @dialog-toggle='onDialogToggle' @dialog-close='onDialogClose' v-if='register' />
        <sign-in @dialog-toggle='onDialogToggle' @dialog-close='onDialogClose' v-else />
    </v-dialog>
</template>
