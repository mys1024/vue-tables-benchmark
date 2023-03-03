import STable from '@surely-vue/table'
import { createApp } from 'vue'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles.css'
import 'uno.css'
import '@surely-vue/table/dist/index.css'

const app = createApp(App)
app.use(STable)
app.mount('#app')
