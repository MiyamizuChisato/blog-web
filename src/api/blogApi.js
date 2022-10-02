import http from '../utils/http.js'

const BASE_PATH = '/blog'
export const getMaster = () => {
    return http.get(`${BASE_PATH}/master`)
}
