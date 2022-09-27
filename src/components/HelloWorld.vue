<script setup>
import { useI18n } from 'vue-i18n'

const { availableLocales, locale } = useI18n()

const themeChangeTrigger = () => {
    document.documentElement.classList.toggle('dark')
}
const languageChangeTrigger = () => {
    const locales = availableLocales
    locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
    <div h='120vh' flex='col' flex-center bg-screen>
        <div>
            <v-btn @click='themeChangeTrigger' m='x-2' bg-primary>
                <span text-light>theme change</span>
            </v-btn>
            <v-btn @click='languageChangeTrigger' m='x-2' bg-success>
                <span text-light>language change</span>
            </v-btn>
        </div>
        <div m='y-4'>
            <span text='6' text-normal>
                &lt;&lt; {{ $t('text') }}&gt;&gt;
            </span>
        </div>
    </div>
</template>
