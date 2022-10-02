import 'uno.css'
import 'vuetify/styles'
import 'aos/dist/aos.css'
import '../assets/styles/markdown.css'
import 'vue-toastification/dist/index.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
    display: {
        mobileBreakpoint: 'sm',
        thresholds: {
            xs: 0,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280
        }
    }
})
export default vuetify
