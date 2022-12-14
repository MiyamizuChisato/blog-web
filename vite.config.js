import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import UnocssIcons from '@unocss/preset-icons'
import { presetUno, presetAttributify, presetIcons } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Unocss({
            presets: [
                presetUno(),
                presetAttributify(),
                presetIcons(),
                UnocssIcons({
                    prefix: 'i-',
                    extraProperties: {
                        'display': 'block',
                        'font-size': '1rem'
                    }
                })
            ],
            theme: {
                colors: {
                    primary: {
                        light: '#1a73e8ff',
                        dark: '#214e8dff'
                    },
                    success: {
                        light: '#81c995ff',
                        dark: '#4c7b5aff'
                    },
                    warning: {
                        light: '#fdd663ff',
                        dark: '#a28023ff'
                    },
                    danger: {
                        light: '#ee675cff',
                        dark: '#864138ff'
                    },
                    strong: {
                        light: 'rgba(0,0,0,0.87)',
                        dark: '#ffffffff'
                    },
                    normal: {
                        light: '#4c4e4dff',
                        dark: '#ddddddff'
                    },
                    secondary: {
                        light: 'rgba(0,0,0,0.6)',
                        dark: 'rgba(255,255,255,0.7)'
                    },
                    screen: {
                        light: '#f9f9f9ff',
                        dark: '#121212'
                    },
                    container: {
                        light: '#ffffffff',
                        dark: '#2f3133ff'
                    },
                    border: {
                        light: 'rgba(0, 0, 0, .12)',
                        dark: 'hsla(0, 0%, 100%, .12)'
                    }
                }
            },
            shortcuts: [
                {
                    'text-light': '!text-light-200',
                    'text-strong': '!text-strong-light !dark:text-strong-dark',
                    'text-normal': '!text-normal-light !dark:text-normal-dark',
                    'text-primary': '!text-primary-light !dark:text-primary-dark',
                    'text-danger': '!text-danger-light !dark:text-danger-dark',
                    'text-success': '!text-success-light !dark:text-success-dark',
                    'text-warning': '!text-warning-light !dark:text-warning-dark',
                    'bg-container': '!bg-container-light !dark:bg-container-dark',
                    'bg-primary': '!bg-primary-light !dark:bg-primary-dark',
                    'bg-danger': '!bg-danger-light !dark:bg-danger-dark',
                    'bg-warning': '!bg-warning-light !dark:bg-warning-dark',
                    'bg-success': '!bg-success-light !dark:bg-success-dark',
                    'text-secondary': '!text-secondary-light !dark:text-secondary-dark',
                    'bg-screen': '!bg-screen-light !dark:bg-screen-dark',
                    'flex-center': '!display-flex !justify-center !items-center',
                    'flex-between': '!display-flex !justify-between !items-center',
                    'flex-start': '!display-flex !justify-start !items-center',
                    'flex-end': '!display-flex !justify-end !items-center'
                }
            ]
        })
    ],
    server: {
        port: 3000,
        proxy: {
            '/api': {
                changeOrigin: true,
                target: 'http://localhost:8080'
            }
        }
    }
})
