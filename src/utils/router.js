import router from '../router/index.js'

export const go = (path) => {
    if (path) {
        return router.push(path)
    }
}
