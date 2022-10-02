import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify.js'
import router from './router'
import i18n from './locales'
import { createPinia } from 'pinia'
import toast from 'vue-toastification'

const toastOptions = {
    position: 'bottom-right',
    timeout: 5000
}
const pinia = createPinia()
createApp(App)
    .use(i18n)
    .use(toast, toastOptions)
    .use(pinia)
    .use(router)
    .use(vuetify)
    .mount('#app')
