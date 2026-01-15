import type { H3Error } from 'h3'

declare module '#app' {
  // Re-export composables
  export { useCookie, defineNuxtPlugin } from 'nuxt/app'
}

declare module 'nuxt/app' {
  interface NuxtError extends H3Error {
    statusCode: number
    fatal?: boolean
    statusMessage?: string
  }

  interface _NuxtApp {
    $router: import('vue-router').Router
  }
}

export {}
