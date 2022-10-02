import http from '../utils/http.js'

const BASE_PATH = '/article'
export const articleGetById = async (id) => {
    const result = await http.get(`${BASE_PATH}/id/${id}`)
    result.data.content = await fetchArticle(result.data.content)
    return result
}
export const fetchArticle = async (filename) => {
    const result = await fetch(import.meta.env.VITE_OSS + filename)
    return result.text()
}
export const articlePost = async (data) => {
    return http.post(`${BASE_PATH}/post`, data)
}
export const articleGetByPage = (current = 0) => {
    return http.get(`${BASE_PATH}/page/${current}`)
}
export const articleGetCarousel = () => {
    return http.get(`${BASE_PATH}/carousel`)
}
