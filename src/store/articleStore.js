import { defineStore } from 'pinia'
import { articleGetByPage } from '../api/articleApi.js'

export const usePostStore = defineStore('article', {
    state: () => {
        return {
            page: {
                current: 0,
                content: [],
                last: false
            }
        }
    },
    getters: {},
    actions: {
        async fetchPage() {
            if (this.page.last) {
                return
            }
            const { data } = await articleGetByPage(this.page.current)
            this.page.content.push(...data.content)
            this.page.last = data.last
            this.page.current += 1
        }
    }
})
