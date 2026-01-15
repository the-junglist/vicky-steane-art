import type { Attrs } from 'vue'

declare module '@nuxt/image' {
  interface NuxtImgAttrs extends Attrs {
    [key: string]: any
  }
}