<script setup>
import { reactive, ref } from 'vue'
import { userLogin } from '../../api/userApi.js'
import { useUserStore } from '../../store/userStore.js'
import { useToast } from 'vue-toastification'
import { EMAIL_RULE, PASSWD_RULE } from '../../utils/rules.js'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emits = defineEmits(['dialog-close', 'dialog-toggle'])
const userStore = useUserStore()
const form = reactive({
    valid: false,
    account: {
        email: '',
        password: ''
    }
})
const formRef = ref(null)
const dialogCloseTrigger = () => {
    emits('dialog-close')
}
const dialogToggleTrigger = () => {
    emits('dialog-toggle')
}
const loginTrigger = async () => {
    formRef.value.validate()
    if (form.valid) {
        const { code, data } = await userLogin(form.account)
        if (code > 0) {
            userStore.saveToken(data)
            const toast = useToast()
            emits('dialog-close')
            toast.success(t(`login.success`))
        }
    }
}
</script>
<template>
    <v-card class='sign-in' p='!2' rounded='0' m='x-auto' bg-container>
        <v-card-title>
            <v-btn @click='dialogCloseTrigger' color='transparent' size='small' variant='flat' icon>
                <i text='10' text-warning i-heroicons-solid-arrow-left-circle />
            </v-btn>
        </v-card-title>
        <v-card-subtitle>
            <div display='flex' justify='between' items='center'>
                <div font='bold' text='7 strong-light dark:strong-dark'>{{ $t(`login.title`) }}</div>
                <v-btn @click='dialogToggleTrigger' bg-danger>
                    <span text-light>{{ $t('button.register') }}</span>
                </v-btn>
            </div>
            <div class='sign-in' m='y-3' text='5' text-secondary>{{ $t('login.subTitle') }}</div>
        </v-card-subtitle>
        <v-card-text>
            <v-form v-model='form.valid' ref='formRef' text='normal-light dark:normal-dark' lazy-validation>
                <v-row p='y-4'>
                    <v-text-field v-model='form.account.email'
                                  :rules='EMAIL_RULE'
                                  :label='$t(`form.email.label`)'
                                  :placeholder='$t(`form.email.place`)' />
                </v-row>
                <v-row p='y-4'>
                    <v-text-field v-model='form.account.password'
                                  :rules='PASSWD_RULE'
                                  :label='$t(`form.password.label`)'
                                  :placeholder='$t(`form.password.place`)'
                                  type='password' autocomplete />
                </v-row>
                <v-row p='y-4'>
                    <v-btn @click='loginTrigger' size='large' w='!full' rounded bg-primary>
                        <div display='flex' items='center'>
                            <span m='x-2' text-light>{{ $t(`button.login`) }}</span>
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
    .sign-in {
        width: 500px;
    }
}
</style>
