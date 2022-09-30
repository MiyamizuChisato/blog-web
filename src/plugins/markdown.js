import 'highlight.js/styles/devibeans.css'
import 'github-markdown-css'
import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'

const parser = new MarkdownIt({
    highlight: function(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, {
                    language: lang,
                    ignoreIllegals: true
                }).value
            } catch (__) {
            }
        }
        return ''
    }
})
export default (markdown) => {
    return parser.render(markdown)
}
