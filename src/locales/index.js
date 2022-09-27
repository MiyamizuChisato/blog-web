import { createI18n } from 'vue-i18n'
import zh from './zh.json'
import en from './en.json'

const messages = {
    en,
    zh
}
const language = (navigator.language || 'en').toLocaleLowerCase()
const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('lang') || language.split('-')[0] || 'en',
    fallbackLocale: 'en',
    messages
})
export default i18n
