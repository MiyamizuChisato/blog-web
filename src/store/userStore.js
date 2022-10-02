import { defineStore } from 'pinia'
import jwtDecode from 'jwt-decode'

export const useUserStore = defineStore('user', {
    state: () => {
        const token = localStorage.getItem('token')
        return {
            token,
            tempUser: {}
        }
    },
    getters: {
        user(state) {
            if (state.token === null || state.token === '') {
                return null
            }
            return jwtDecode(state.token)
        }

    },
    actions: {
        saveToken(token) {
            this.token = token
            localStorage.setItem('token', token)
        },
        equals(id) {
            if (this.token === null || this.token === '') {
                return false
            } else {
                return (String(this.user.id) === id)
            }
        }
    }
})
