declare module 'nuxt/app' {
  interface _NuxtApp {
    $router: import('vue-router').Router
  }
}

export {}
