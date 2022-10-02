<script setup>
import { inject, reactive, ref } from 'vue'
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'
import Avatar from '../../../components/Avatar.vue'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../../../store/userStore.js'
import { dataURLtoFile } from '../../../utils/file.js'
import { userUpdateAvatar } from '../../../api/userApi.js'

defineProps({
    editing: Boolean
})
const { t } = useI18n()
const oss = inject('oss')
const user = inject('user')
const userStore = useUserStore()
const temp = userStore.tempUser
const formRef = ref(null)
const dialog = ref(false)
const loading = ref(false)
const avatar = ref(null)
const cropperRef = ref(null)
const inputRef = ref(null)
const cropperOptions = reactive({
    outputSize: 1,
    outputType: 'png',
    canScale: true,
    canMove: true,
    autoCrop: true,
    height: 100,
    width: 100,
    fixed: true,
    fixedBox: true,
    fixedNumber: [1, 1],
    full: true,
    canMoveBox: true,
    original: false,
    centerBox: true
})
const onAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file === undefined) {
        return
    }
    if (file.type !== 'image/png') {
        const toast = useToast()
        toast.error(t(`user.typeError`))
        return
    }
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
        avatar.value = reader.result
    }
    dialog.value = true
}
const cancelTrigger = () => {
    dialog.value = false
    avatar.value = null
    // 清除input文件，两次选择相同的文件也能出发onchange事件
    inputRef.value.value = null
}
const uploadTrigger = () => {
    loading.value = true
    cropperRef.value.getCropData(async (value) => {
        const file = dataURLtoFile(value, 'avatar.png')
        const fd = new FormData()
        fd.append('avatar', file)
        const { code, data } = await userUpdateAvatar(fd)
        if (code > 0) {
            userStore.saveToken(data.token)
            user.value = data.user
        }
        cancelTrigger()
        loading.value = false
    })
}
</script>
<template>
    <div p='y-4' bg-container text-normal>
        <div position='relative' display='flex' justify='center'>
            <avatar width='98px' height='98px' :image='oss+user.avatar' />
            <label v-if='editing' class='avatar-mask' v-ripple flex-center>
                <i display='block' i-mdi-file-image-box text='1.75rem' text-light />
                <input @change='onAvatarChange' type='file' accept='image/png' ref='inputRef' hidden>
            </label>
        </div>
        <v-form m='t-6' ref='formRef' flex='col' flex-center lazy-validation>
            <div text='5' font='bold' w='!85%' flex-center text-strong>
                <v-text-field v-if='editing' v-model='user.nickname' :label='`用户名`' />
                <span v-else>{{ temp.nickname }}</span>
            </div>
            <div w='85%' flex-center>
                <v-textarea v-if='editing' v-model='user.motto' :label='`签名`' />
                <p text='center' break='all' v-else>
                    {{ temp.motto || $t(`user.motto`) }}
                </p>
            </div>
        </v-form>
    </div>
    <v-dialog v-model='dialog' persistent>
        <div overflow='hidden' w='md:280px' m='!x-auto' border='rounded-md' bg-container>
            <div h='280px' m='x-auto'>
                <vue-cropper ref='cropperRef'
                             :img='avatar'
                             :auto-crop-height='cropperOptions.height'
                             :auto-crop-width='cropperOptions.width'
                             :output-size='cropperOptions.outputSize'
                             :output-type='cropperOptions.outputType'
                             :can-scale='cropperOptions.canScale'
                             :can-move='cropperOptions.canMove'
                             :auto-crop='cropperOptions.autoCrop'
                             :fixed-box='cropperOptions.fixedBox'
                             :fixed='cropperOptions.fixed'
                             :fixed-number='cropperOptions.fixedNumber'
                             :full='cropperOptions.full'
                             :can-move-box='cropperOptions.canMoveBox'
                             :original='cropperOptions.original'
                             :center-box='cropperOptions.centerBox' />
            </div>
            <div m='y-2' flex-center>
                <v-btn :loading='loading' @click='uploadTrigger' m='x-4' bg-primary>
                    <span text='light-200'>上传</span>
                </v-btn>
                <v-btn :disabled='loading' @click='cancelTrigger' m='x-4' bg-danger>
                    <span text='light-200'>取消</span>
                </v-btn>
            </div>
        </div>
    </v-dialog>
</template>
<style scoped>
.avatar-mask {
    width: 118px;
    height: 118px;
    border-radius: 50%;
    transform: translateY(-10px);
    position: absolute;
    background-color: rgba(0, 0, 0, 0.2);
}
</style>
