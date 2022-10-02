import i18n from '../locales/index.js'
import { CODE_EXP, EMAIL_EXP, NICKNAME_EXP, PASSWD_EXP } from './regexp.js'

const { t } = i18n.global
const required = t(`form.rule.required`)
const pattern = t(`form.rule.pattern`)
export const EMAIL_RULE = [
    v => !!v || required,
    v => EMAIL_EXP.test(v) || pattern
]
export const PASSWD_RULE = [
    v => !!v || required,
    v => PASSWD_EXP.test(v) || pattern
]
export const NICKNAME_RULE = [
    v => !!v || required,
    v => NICKNAME_EXP.test(v) || pattern
]
export const CODE_RULE = [
    v => !!v || required,
    v => CODE_EXP.test(v) || pattern
]
