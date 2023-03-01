import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import type { UserModule } from '~/types'

export const install: UserModule = (app) => {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  })
  app.use(router)
}
