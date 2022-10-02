import i18n from '../locales/index.js'

const { t } = i18n.global
export const timeFormat = (time) => {
    time = (time.split(' ')[0]).split('-')
    const year = time[0]
    const month = monthFormat(time[1])
    return `${month} ${time[2]}, ${year}`
}
const monthFormat = (month) => {
    return t(`time.month.${month}`)
}
