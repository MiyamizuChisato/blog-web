import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => {
        return {
            loading: true,
            scroll: {
                posts: {
                    position: 0,
                    into: false
                }
            }
        }
    },
    getters: {},
    actions: {}
})
