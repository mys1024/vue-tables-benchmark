import { createApp } from 'vue'
import App from './App.vue'
import type { UserModule } from '~/types'

import '@unocss/reset/tailwind.css'
import './style/main.less'
import 'uno.css'

const app = createApp(App)

// install vue plugins
Object.values(import.meta.glob<{ install: UserModule }>('./module/*.ts', { eager: true }))
  .forEach(i => i.install(app))

// mount
app.mount('#app')
