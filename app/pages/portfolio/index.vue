<template>
  <div class="min-h-screen bg-zinc-950">
    <div class="container mx-auto px-4 py-16">
      <h1 class="text-5xl font-bold text-lime-400 mb-4">Portfolio</h1>
      <p class="text-xl text-gray-400 mb-12 max-w-3xl">
        Explore 20+ years of diverse artwork including paintings, collages, murals, and illustrations.
      </p>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <NuxtLink
          to="/portfolio/paintings"
          class="group bg-zinc-900 hover:bg-zinc-800 rounded-lg overflow-hidden transition-colors"
        >
          <div class="aspect-square bg-zinc-800 flex items-center justify-center">
            <Icon name="mdi:palette" class="text-6xl text-lime-400 group-hover:scale-110 transition-transform" />
          </div>
          <div class="p-6">
            <h2 class="text-2xl font-bold text-lime-400 mb-2">Paintings</h2>
            <p class="text-gray-400">Mixed media & acrylic works</p>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/portfolio/collages"
          class="group bg-zinc-900 hover:bg-zinc-800 rounded-lg overflow-hidden transition-colors"
        >
          <div class="aspect-square bg-zinc-800 flex items-center justify-center">
            <Icon name="mdi:collage" class="text-6xl text-lime-400 group-hover:scale-110 transition-transform" />
          </div>
          <div class="p-6">
            <h2 class="text-2xl font-bold text-lime-400 mb-2">Collages</h2>
            <p class="text-gray-400">Intricate map & paper collages</p>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/portfolio/murals"
          class="group bg-zinc-900 hover:bg-zinc-800 rounded-lg overflow-hidden transition-colors"
        >
          <div class="aspect-square bg-zinc-800 flex items-center justify-center">
            <Icon name="mdi:wall" class="text-6xl text-lime-400 group-hover:scale-110 transition-transform" />
          </div>
          <div class="p-6">
            <h2 class="text-2xl font-bold text-lime-400 mb-2">Murals & Commissions</h2>
            <p class="text-gray-400">Large-scale wall art</p>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/portfolio/illustrations"
          class="group bg-zinc-900 hover:bg-zinc-800 rounded-lg overflow-hidden transition-colors"
        >
          <div class="aspect-square bg-zinc-800 flex items-center justify-center">
            <Icon name="mdi:draw" class="text-6xl text-lime-400 group-hover:scale-110 transition-transform" />
          </div>
          <div class="p-6">
            <h2 class="text-2xl font-bold text-lime-400 mb-2">Illustrations</h2>
            <p class="text-gray-400">Biro drawings & sketches</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Portfolio - Vicky Steane Art',
  meta: [
    { name: 'description', content: 'Browse artwork including paintings, collages, murals, and illustrations by London artist Vicky Steane.' }
  ]
})
</script>
