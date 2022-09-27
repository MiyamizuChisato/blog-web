import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify.js'
import router from './router'
import i18n from './locales'
import { createPinia } from 'pinia'

const pinia = createPinia()
createApp(App)
    .use(i18n)
    .use(pinia)
    .use(router)
    .use(vuetify)
    .mount('#app')
