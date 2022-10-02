<script setup>
import onLoadFinished from '../../hooks/onLoadFinished.js'
import { useAppStore } from '../../store/appStore.js'
import { computed, provide, ref } from 'vue'
import UserCard from './components/UserCard.vue'
import UserInfo from './components/UserInfo.vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../../store/userStore.js'
import { userGetById, userUpdate } from '../../api/userApi.js'
import lodash from 'lodash'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()
const appStore = useAppStore()
const userStore = useUserStore()
const loading = computed(() => appStore.loading)
const equals = computed(() => userStore.equals(route.params.id))
const tab = ref('info')
const editing = ref(false)
const user = ref(null)
const init = async () => {
    const { code, data } = await userGetById(route.params.id)
    if (code > 0) {
        user.value = data
        userStore.$patch({
            tempUser: {
                ...lodash.cloneDeep(data)
            }
        })
    }
}
const modifyCancelTrigger = () => {
    editing.value = false
    user.value = userStore.tempUser
}
const modifySaveTrigger = async () => {
    const { code, data } = await userUpdate(user.value)
    if (code > 0) {
        userStore.saveToken(data.token)
        user.value = data.user
        userStore.$patch({
            tempUser: {
                ...lodash.cloneDeep(data.user)
            }
        })
        editing.value = false
        const toast = useToast()
        toast.success(t(`toast.success`))
    }
}
onLoadFinished(async () => {
    await init()
})
provide('user', user)
</script>
<template>
    <div v-if='!loading' :key='route.params.id' id='user'>
        <div border='rounded-md' overflow='hidden'>
            <div v-if='equals' p='4' bg-container flex-between>
                <v-btn @click='modifySaveTrigger' v-if='editing' size='small' bg-success>
                    <span text-light>{{ $t(`button.save`) }}</span>
                </v-btn>
                <v-btn @click='modifyCancelTrigger' v-if='editing' size='small' bg-danger>
                    <span text-light>{{ $t(`button.cancel`) }}</span>
                </v-btn>
                <v-btn @click='editing = true' size='small' v-else bg-primary>
                    <span text-light>{{ $t(`button.modify`) }}</span>
                </v-btn>
            </div>
            <user-card :editing='editing' />
        </div>
        <v-tabs v-model='tab' m='t-6 b-3' overflow='hidden' border='rounded-md' bg-container fixed-tabs>
            <v-tab value='info'>
                <div display='flex' items='center'>
                    <i display='block' text='1.5rem danger-light dark:danger-dark'
                       i-mdi-text-box-search />
                    <span p='x-2' text='normal-light dark:normal-dark'>资料</span>
                </div>
            </v-tab>
            <v-tab value='comment'>
                <div display='flex' items='center'>
                    <i display='block' text='1.5rem success-light dark:success-dark'
                       i-mdi-comment />
                    <span p='x-2' text='normal-light dark:normal-dark'>评论</span>
                </div>
            </v-tab>
            <v-tab value='message'>
                <div display='flex' items='center'>
                    <i display='block' text='1.5rem primary-light dark:primary-dark'
                       i-mdi-email-newsletter />
                    <span p='x-2' text='normal-light dark:normal-dark'>留言</span>
                </div>
            </v-tab>
        </v-tabs>
        <div overflow='hidden' border='rounded-md'>
            <v-window v-model='tab'>
                <v-window-item value='info'>
                    <user-info bg-container />
                </v-window-item>
                <v-window-item value='comment'>
                    <div p='6' bg-container text-primary>内容正在制作中</div>
                </v-window-item>
                <v-window-item value='message'>
                    <div p='6' bg-container text-primary>内容正在制作中</div>
                </v-window-item>
            </v-window>
        </div>
    </div>
</template>


<style scoped>
#user {
    margin: 24px auto;
    padding-left: 10px;
    padding-right: 10px;
    max-width: 720px;
}
</style>
