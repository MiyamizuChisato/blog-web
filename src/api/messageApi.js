import http from '../utils/http.js'

const BASE_PATH = '/message'
export const messageGetByPage = (current = 0) => {
    return http.get(`${BASE_PATH}/page/${current}`)
}
export const subMessageGetByMessageId = (id) => {
    return http.get(`${BASE_PATH}/sub/id/${id}`)
}
export const messagePost = async (comment) => {
    return http.post(`${BASE_PATH}/post`, comment)
}
