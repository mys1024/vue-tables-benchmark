import { useDark, usePreferredDark, useToggle } from '@vueuse/core'
import { watchEffect } from 'vue'

export const isDark = useDark()
export const toggleDark = useToggle(isDark)
export const preferredDark = usePreferredDark()

watchEffect(() => {
  document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  )!.content = isDark.value ? '#00aba9' : '#ffffff'
  document.querySelector<HTMLLinkElement>(
    'link[rel="icon"][type="image/svg+xml"]',
  )!.href = preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'
})
