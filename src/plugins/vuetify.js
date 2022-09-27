import 'vuetify/styles'
import 'uno.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'

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
