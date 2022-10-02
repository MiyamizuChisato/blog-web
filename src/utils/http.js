import axios from 'axios'
import { useToast } from 'vue-toastification'
import i18n from '../locales/index.js'

const { t } = i18n.global
const http = axios.create({
    baseURL: '/api',
    timeout: 50000,
    withCredentials: true,
    headers: {
        'content-type': 'application/json;charset=UTF-8'
    }
})
const beforeRequest = config => {
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = token)
    return config
}

const responseSuccess = response => {
    const { code } = response.data
    if (code < 0) {
        const toast = useToast()
        toast.error(t(`toast.error`))
    }
    return Promise.resolve(response.data)
}
const responseFailed = error => {
    return Promise.reject(error)
}
http.interceptors.request.use(beforeRequest)
http.interceptors.response.use(responseSuccess, responseFailed)
export default http
