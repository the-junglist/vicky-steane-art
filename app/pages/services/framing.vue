<template>
  <div class="min-h-screen bg-zinc-950">
    <div class="container mx-auto px-4 py-16 max-w-4xl">
      <div class="mb-8">
        <NuxtLink to="/services" class="text-lime-400 hover:text-lime-300 flex items-center gap-2 mb-4">
          <Icon name="mdi:arrow-left" /> Back to Services
        </NuxtLink>
        <h1 class="text-5xl font-bold text-lime-400 mb-4">Bespoke Picture Framing</h1>
        <p class="text-xl text-lime-400 mb-4">Tyler Studios</p>
      </div>

      <div class="prose prose-invert prose-lg max-w-none">
        <div class="bg-zinc-900 rounded-lg p-8 mb-8">
          <p class="text-gray-300 leading-relaxed">
            For over 16 years, Tyler Studios on Eel Pie Island in Twickenham has provided hand-finished, 
            bespoke picture framing services to prestigious clients including galleries, museums, and 
            renowned artists.
          </p>
        </div>

        <div class="bg-zinc-900 rounded-lg p-8 mb-8">
          <h2 class="text-3xl text-lime-400 mb-4">Prestigious Clients</h2>
          <p class="text-gray-300 mb-4">Trusted by leading artists and institutions:</p>
          <ul class="text-gray-300 space-y-2">
            <li class="flex items-center gap-3">
              <Icon name="mdi:star" class="text-lime-400 text-xl" />
              <span>Damien Hirst</span>
            </li>
            <li class="flex items-center gap-3">
              <Icon name="mdi:star" class="text-lime-400 text-xl" />
              <span>Tracy Emin</span>
            </li>
            <li class="flex items-center gap-3">
              <Icon name="mdi:star" class="text-lime-400 text-xl" />
              <span>Turner Prize winners</span>
            </li>
            <li class="flex items-center gap-3">
              <Icon name="mdi:star" class="text-lime-400 text-xl" />
              <span>Tate Gallery exhibitions</span>
            </li>
            <li class="flex items-center gap-3">
              <Icon name="mdi:star" class="text-lime-400 text-xl" />
              <span>Battersea Power Station Museum</span>
            </li>
            <li class="flex items-center gap-3">
              <Icon name="mdi:star" class="text-lime-400 text-xl" />
              <span>The London Museum (including a Picasso)</span>
            </li>
          </ul>
        </div>

        <div class="bg-zinc-900 rounded-lg p-8">
          <h2 class="text-3xl text-lime-400 mb-4">Services</h2>
          <ul class="text-gray-300 space-y-3">
            <li class="flex items-start gap-3">
              <Icon name="mdi:check-circle" class="text-lime-400 text-2xl mt-1 flex-shrink-0" />
              <span>Custom frame design and construction</span>
            </li>
            <li class="flex items-start gap-3">
              <Icon name="mdi:check-circle" class="text-lime-400 text-2xl mt-1 flex-shrink-0" />
              <span>Hand-finished frames using premium materials</span>
            </li>
            <li class="flex items-start gap-3">
              <Icon name="mdi:check-circle" class="text-lime-400 text-2xl mt-1 flex-shrink-0" />
              <span>Museum-quality conservation framing</span>
            </li>
            <li class="flex items-start gap-3">
              <Icon name="mdi:check-circle" class="text-lime-400 text-2xl mt-1 flex-shrink-0" />
              <span>Professional mounting and matting</span>
            </li>
            <li class="flex items-start gap-3">
              <Icon name="mdi:check-circle" class="text-lime-400 text-2xl mt-1 flex-shrink-0" />
              <span>Restoration and re-framing services</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 text-center">
        <NuxtLink
          to="/contact"
          class="inline-block bg-lime-500 hover:bg-lime-400 text-zinc-950 font-bold py-3 px-8 rounded-lg transition-colors"
        >
          Get a Framing Quote
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Bespoke Picture Framing - Tyler Studios',
  meta: [
    { name: 'description', content: 'Hand-finished bespoke picture framing from Tyler Studios. Trusted by Damien Hirst, Tracy Emin, Tate Gallery, and museums.' }
  ]
})
</script>
