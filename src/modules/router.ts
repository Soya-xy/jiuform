import { createRouter, createWebHashHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import NProgress from 'nprogress'
import type { App } from 'vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: setupLayouts(routes),
})

router.beforeEach((to, from) => {
  if (to.path !== from.path)
    NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export function install(app: App) {
  app.use(router)
}
