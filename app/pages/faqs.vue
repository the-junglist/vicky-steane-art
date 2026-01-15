<template>
  <div class="min-h-screen bg-zinc-950">
    <div class="container mx-auto px-4 py-16 max-w-4xl">
      <h1 class="text-5xl font-bold text-lime-400 mb-12">FAQs</h1>

      <div class="space-y-6">
        <div class="bg-zinc-900 rounded-lg p-6">
          <h2 class="text-2xl font-bold text-lime-400 mb-3">Do you do commissions?</h2>
          <p class="text-gray-300">
            Yes! I love creating bespoke artwork for clients. Whether it's a mural, painting, or illustration,
            get in touch to discuss your project.
          </p>
        </div>

        <div class="bg-zinc-900 rounded-lg p-6">
          <h2 class="text-2xl font-bold text-lime-400 mb-3">What areas do you cover?</h2>
          <p class="text-gray-300">
            I'm based in London and the South West of England, but I take on projects nationwide for larger
            commissions and mural work.
          </p>
        </div>

        <div class="bg-zinc-900 rounded-lg p-6">
          <h2 class="text-2xl font-bold text-lime-400 mb-3">Do you offer framing services?</h2>
          <p class="text-gray-300">
            Yes, through Tyler Studios I provide bespoke, hand-finished picture framing. I've worked with
            prestigious clients including galleries and museums.
          </p>
        </div>

        <div class="bg-zinc-900 rounded-lg p-6">
          <h2 class="text-2xl font-bold text-lime-400 mb-3">Can I buy prints of your work?</h2>
          <p class="text-gray-300">
            Many of my paintings are available as prints, clothing, and gifts through my online shop.
            Visit the shop for unique London-inspired artwork!
          </p>
        </div>

        <div class="bg-zinc-900 rounded-lg p-6">
          <h2 class="text-2xl font-bold text-lime-400 mb-3">Do you run art classes?</h2>
          <p class="text-gray-300">
            Yes! I offer art classes and creative workshops for all ages and skill levels. Perfect for
            parties, team building, or individual learning.
          </p>
        </div>
      </div>

      <div class="mt-12 text-center">
        <p class="text-gray-400 mb-6">Still have questions?</p>
        <NuxtLink
          to="/contact"
          class="inline-block bg-lime-500 hover:bg-lime-400 text-zinc-950 font-bold py-3 px-8 rounded-lg transition-colors"
        >
          Contact Me
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'FAQs - Vicky Steane Art',
  meta: [
    { name: 'description', content: 'Frequently asked questions about commissions, framing services, art classes, and purchasing artwork.' }
  ]
})
</script>
