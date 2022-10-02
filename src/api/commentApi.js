import http from '../utils/http.js'

const BASE_PATH = '/comment'
export const subCommentGetByCommentId = async (id) => {
    return http.get(`${BASE_PATH}/sub/id/${id}`)
}
export const commentPost = async (comment) => {
    return http.post(`${BASE_PATH}/post`, comment)
}
