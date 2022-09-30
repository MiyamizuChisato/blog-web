<script setup>
import { reactive, ref } from 'vue'

const emits = defineEmits(['dialog-close', 'dialog-toggle'])
const formRef = ref(null)
const form = reactive({
    valid: false,
    reSend: 0,
    account: {
        email: '',
        code: '',
        password: '',
        surePassword: ''
    }
})
const dialogCloseTrigger = () => {
    emits('dialog-close')
}
const dialogToggleTrigger = () => {
    emits('dialog-toggle')
}
</script>
<template>
    <v-card class='sign-up' rounded='0' p='!2' m='x-auto' bg-container>
        <v-card-title>
            <v-btn @click='dialogCloseTrigger' color='transparent' size='small' icon flat>
                <i text='10' text-warning i-mdi-arrow-left-drop-circle />
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
                    <v-text-field v-model='form.account.email' :label='$t(`form.email.label`)'
                                  :placeholder='$t(`form.email.place`)'>
                        <template #append-inner>
                            <div position='relative' bottom='1.5'>
                                <v-avatar v-if='form.reSend>0' text-secondary>
                                    {{ form.reSend }}
                                </v-avatar>
                                <v-btn @click='' cursor='pointer' size='small' color='transparent'
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
                    <v-text-field v-model='form.account.code' :label='$t(`form.code.label`)'
                                  :placeholder='$t(`form.code.place`)' required />
                </v-row>
                <v-row p='y-4'>
                    <v-text-field v-model='form.account.code' :label='$t(`form.nickname.label`)'
                                  :placeholder='$t(`form.nickname.place`)' required />
                </v-row>
                <v-row p='y-4'>
                    <v-text-field v-model='form.account.password'
                                  :label='$t(`form.password.label`)'
                                  :placeholder='$t(`form.password.place`)'
                                  type='password' required />
                </v-row>
                <v-row p='y-4'>
                    <v-text-field v-model='form.account.surePassword'
                                  :label='$t(`form.surePassword.label`)'
                                  :placeholder='$t(`form.surePassword.place`)'
                                  type='password' />
                </v-row>
                <v-row m='!y-2'>
                    <div text='3.2' text-secondary>其他信息可在注册成功后进行修改</div>
                </v-row>
                <v-row p='y-4'>
                    <v-btn @click='' size='large' w='!full' rounded bg-primary flat>
                        <div display='flex' items='center'>
                            <span m='x-2' text-light>{{ $t(`button.register`) }}</span>
                            <i text='1.5rem' i-mdi-arrow-right-drop-circle text-light />
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
