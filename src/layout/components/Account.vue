<script setup>
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import SignUp from './SignUp.vue'
import SignIn from './SignIn.vue'
import { ref } from 'vue'

const router = useRouter()
const { mobile } = useDisplay()
const exit = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
}
const go = (path) => {
    if (path) {
        router.push(path)
    }
}
const dialog = ref(false)
const register = ref(false)
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

</script>
<template>
    <v-btn v-if='false' color='transparent' flat icon>
        <img src='src/assets/vue.svg' w='36px' h='36px' class='rounded-full' alt='avatar'>
        <v-menu location='bottom' activator='parent'>
            <v-list shadow='!none' p='!0' m='y-3' bg-container>
                <v-list-item value='account' @click='go(`/user/`+user.id)'>
                    <v-list-item-title>
                        <div display='flex' items='center' text-normal>
                            <i m='x-1' i-mdi-account-circle />
                            <span m='x-1'>{{ `我的账号` }}</span>
                        </div>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item value='exit' @click='exit'>
                    <v-list-item-title>
                        <div display='flex' items='center' text-normal>
                            <i m='x-1' i-mdi-arrow-left-drop-circle />
                            <span m='x-1'>{{ `退出登录` }}</span>
                        </div>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-btn>
    <v-btn @click='dialogOpenTrigger' bg-primary variant='text'>
        <span text-light>{{ $t(`button.login`) }}</span>
    </v-btn>
    <v-dialog :fullscreen='mobile' v-model='dialog' transition='dialog-bottom-transition' persistent flex-center>
        <sign-up @dialog-toggle='onDialogToggle' @dialog-close='onDialogClose' v-if='register' />
        <sign-in @dialog-toggle='onDialogToggle' @dialog-close='onDialogClose' v-else />
    </v-dialog>
</template>
