import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import ResolveAlias from 'vite-plugin-easy-resolve-alias'
import Unocss from 'unocss/vite'

export default defineConfig({
  plugins: [
    // https://github.com/mys1024/vite-plugin-easy-resolve-alias
    ResolveAlias({ '~/': 'src/' }),

    // https://github.com/vitejs/vite/tree/main/packages/plugin-vue
    Vue(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({ dirs: 'src/page' }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    include: ['test/**/*.test.ts'],
  },
})
