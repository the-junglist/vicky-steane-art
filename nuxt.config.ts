import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2026-01-16',

  future: {
    compatibilityVersion: 4
  },

  css: [
    "@/assets/main.css"
  ],

  typescript: {
    strict: true,
    shim: false,
    typeCheck: false
  },

  modules: [
    ['@nuxtjs/google-fonts', {
      families: {
        Cormorant: [400, 500, 700, '400italic', '700italic'],
        'Sedgwick Ave': [400],
      },
      display: 'swap',
      preload: true,
      prefetch: true,
      preconnect: true,
      download: true,
      base64: false,
      inject: true,
      overwriting: false,
      outputDir: 'assets/fonts',
      stylePath: 'css/fonts.css',
      fontsDir: 'fonts',
      fontsPath: '~assets/fonts'
    }],
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/robots',
    'nuxt-simple-sitemap'
  ],

  image: {
    formats: ['webp', 'avif'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },

  app: {
    head: {
      title: 'Vicky Steane Art - Custom Murals, Paintings & Commissions',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Established London artist specializing in murals, collages, paintings, and illustrations. 20+ years experience creating bespoke artwork.' },
        { name: 'theme-color', content: '#09090b' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
      ]
    }
  },

  site: {
    url: 'https://vicky-steane-art.pages.dev',
    name: 'Vicky Steane Art'
  },

  nitro: {
    preset: 'cloudflare-pages'
  }
})
