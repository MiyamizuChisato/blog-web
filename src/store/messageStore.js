import { defineStore } from 'pinia'
import { messageGetByPage } from '../api/messageApi.js'

export const useMessageStore = defineStore('message', {
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
            const { data } = await messageGetByPage(this.page.current)
            this.page.content.push(...data.content)
            this.page.last = data.last
            this.page.current += 1
        }
    }
})
