<script setup>
import { reactive, ref } from 'vue'
import { sendEmailVerifyCode } from '../../api/mailApi.js'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import { userRegister } from '../../api/userApi.js'
import { useUserStore } from '../../store/userStore.js'
import { EMAIL_EXP } from '../../utils/regexp.js'
import { CODE_RULE, EMAIL_RULE, NICKNAME_RULE, PASSWD_RULE } from '../../utils/rules.js'

const { t } = useI18n()
const userStore = useUserStore()
const emits = defineEmits(['dialog-close', 'dialog-toggle'])
const formRef = ref(null)
const form = reactive({
    valid: false,
    timer: 0,
    user: {
        code: '',
        nickname: '',
        userAccount: {
            email: '',
            password: '',
            surePassword: ''
        }
    }
})
const dialogCloseTrigger = () => {
    emits('dialog-close')
}
const dialogToggleTrigger = () => {
    emits('dialog-toggle')
}
const codeSendTrigger = async () => {
    if (EMAIL_EXP.test(form.user.userAccount.email)) {
        const { code } = await sendEmailVerifyCode(form.user.userAccount.email)
        if (code > 0) {
            form.timer = 90
            const codeTimer = setInterval(() => {
                form.timer -= 1
                if (form.timer <= 0) {
                    clearInterval(codeTimer)
                }
            }, 1000)
            const toast = useToast()
            toast.success(t(`register.send`))
        }
    }
}
const registerTrigger = async () => {
    formRef.value.validate()
    if (form.valid) {
        const { code, data } = await userRegister(form.user)
        if (code > 0) {
            userStore.saveToken(data)
            emits('dialog-close')
            const toast = useToast()
            toast.success(t(`register.success`))
        }
    }
}
</script>

<template>
    <v-card class='sign-up' rounded='0' p='!2' m='x-auto' bg-container>
        <v-card-title>
            <v-btn @click='dialogCloseTrigger' color='transparent' size='small' icon flat>
                <i text='10' text-warning i-heroicons-solid-arrow-left-circle />
            </v-btn>
        </v-card-title>
        <v-card-subtitle>
            <div display='flex' justify='between' items='center'>
                <div font='bold' text='1.5rem strong-light dark:strong-dark'>{{ $t(`register.title`) }}</div>
                <v-btn @click='dialogToggleTrigger' bg-danger flat>
                    <span text-light>{{ $t(`button.login`) }}</span>
                </v-btn>
            </div>
            <div class='sign-in' m='y-3' text='1.2rem' text-secondary>{{ $t(`register.subTitle`) }}</div>
        </v-card-subtitle>
        <v-card-text>
            <v-form v-model='form.valid' ref='formRef' text='normal-light dark:normal-dark' lazy-validation>
                <v-row p='y-4'>
                    <v-text-field v-model='form.user.userAccount.email'
                                  :rules='EMAIL_RULE'
                                  :label='$t(`form.email.label`)'
                                  :placeholder='$t(`form.email.place`)'>
                        <template #append-inner>
                            <div position='relative' bottom='1.5'>
                                <v-avatar v-if='form.timer > 0' text-secondary>
                                    {{ form.timer }}
                                </v-avatar>
                                <v-btn @click='codeSendTrigger' cursor='pointer' size='small' color='transparent'
                                       icon flat v-else>
                                    <v-tooltip activator='parent' location='bottom'>
                                        {{ $t(`button.send`) }}
                                    </v-tooltip>
                                    <i text='2rem' i-mdi-send-circle text-success />
                                </v-btn>
                            </div>
                        </template>
                    </v-text-field>
                </v-row>
                <v-row p='y-4'>
                    <v-text-field v-model='form.user.code'
                                  :rules='CODE_RULE'
                                  :label='$t(`form.code.label`)'
                                  :placeholder='$t(`form.code.place`)' />
                </v-row>
                <v-row p='y-4'>
                    <v-text-field v-model='form.user.nickname'
                                  :rules='NICKNAME_RULE'
                                  :label='$t(`form.nickname.label`)'
                                  :placeholder='$t(`form.nickname.place`)' />
                </v-row>
                <v-row p='y-4'>
                    <v-text-field v-model='form.user.userAccount.password'
                                  :rules='PASSWD_RULE'
                                  :label='$t(`form.password.label`)'
                                  :placeholder='$t(`form.password.place`)'
                                  type='password' />
                </v-row>
                <v-row p='y-2'>
                    <div text='3.2' p='y-2' text-secondary>其他信息可在注册成功后进行修改</div>
                    <v-btn @click='registerTrigger' size='large' w='!full' rounded bg-primary flat>
                        <div display='flex' items='center'>
                            <span m='x-2' text-light>{{ $t(`button.register`) }}</span>
                            <i text='1.5rem' i-heroicons-solid-arrow-right-circle text-light />
                        </div>
                    </v-btn>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<style scoped>
@media screen and (min-width: 640px) {
    .sign-up {
        width: 500px;
    }
}

::-webkit-scrollbar-track {
    background-color: var(--c-container);
}
</style>
