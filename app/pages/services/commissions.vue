<template>
  <div class="min-h-screen bg-zinc-950">
    <div class="container mx-auto px-4 py-16 max-w-4xl">
      <div class="mb-8">
        <NuxtLink to="/services" class="text-lime-400 hover:text-lime-300 flex items-center gap-2 mb-4">
          <Icon name="mdi:arrow-left" /> Back to Services
        </NuxtLink>
        <h1 class="text-5xl font-bold text-lime-400 mb-4">Commissions</h1>
      </div>

      <div class="prose prose-invert prose-lg max-w-none">
        <div class="bg-zinc-900 rounded-lg p-8 mb-8">
          <p class="text-gray-300 leading-relaxed">
            Commission bespoke artwork created specifically for you. Whether you want a portrait, landscape, 
            abstract piece, or something completely unique, I work closely with you to bring your vision to life.
          </p>
        </div>

        <div class="bg-zinc-900 rounded-lg p-8 mb-8">
          <h2 class="text-3xl text-lime-400 mb-4">Commission Types</h2>
          <div class="grid md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h3 class="text-xl font-bold text-lime-400 mb-2">Paintings</h3>
              <p>Mixed media, acrylic, or oil paintings in any size</p>
            </div>
            <div>
              <h3 class="text-xl font-bold text-lime-400 mb-2">Collages</h3>
              <p>Custom map collages or mixed media pieces</p>
            </div>
            <div>
              <h3 class="text-xl font-bold text-lime-400 mb-2">Illustrations</h3>
              <p>Biro drawings, sketches, and detailed artwork</p>
            </div>
            <div>
              <h3 class="text-xl font-bold text-lime-400 mb-2">Portraits</h3>
              <p>Personal or family portraits in your preferred style</p>
            </div>
          </div>
        </div>

        <div class="bg-zinc-900 rounded-lg p-8">
          <h2 class="text-3xl text-lime-400 mb-4">How It Works</h2>
          <ol class="text-gray-300 space-y-4">
            <li class="flex gap-4">
              <span class="text-2xl font-bold text-lime-400">1.</span>
              <div>
                <strong class="text-lime-400">Initial Consultation:</strong> Discuss your ideas, preferences, and requirements
              </div>
            </li>
            <li class="flex gap-4">
              <span class="text-2xl font-bold text-lime-400">2.</span>
              <div>
                <strong class="text-lime-400">Quote:</strong> Receive a detailed quote based on size, complexity, and materials
              </div>
            </li>
            <li class="flex gap-4">
              <span class="text-2xl font-bold text-lime-400">3.</span>
              <div>
                <strong class="text-lime-400">Sketches:</strong> Review preliminary sketches and provide feedback
              </div>
            </li>
            <li class="flex gap-4">
              <span class="text-2xl font-bold text-lime-400">4.</span>
              <div>
                <strong class="text-lime-400">Creation:</strong> Your artwork is created with regular updates
              </div>
            </li>
            <li class="flex gap-4">
              <span class="text-2xl font-bold text-lime-400">5.</span>
              <div>
                <strong class="text-lime-400">Delivery:</strong> Finished piece delivered or shipped to you
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div class="mt-12 text-center">
        <NuxtLink
          to="/contact"
          class="inline-block bg-lime-500 hover:bg-lime-400 text-zinc-950 font-bold py-3 px-8 rounded-lg transition-colors"
        >
          Discuss Your Commission
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Art Commissions - Vicky Steane Art',
  meta: [
    { name: 'description', content: 'Commission bespoke artwork including paintings, collages, illustrations, and portraits by Vicky Steane.' }
  ]
})
</script>
