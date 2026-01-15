<template>
  <div class="min-h-screen bg-zinc-950">
    <div class="container mx-auto px-4 py-16">
      <h1 class="text-5xl font-bold text-lime-400 mb-4">Services</h1>
      <p class="text-xl text-gray-400 mb-12 max-w-3xl">
        Professional art services including murals, framing, commissions, and creative workshops.
      </p>

      <div class="grid md:grid-cols-2 gap-8">
        <NuxtLink
          to="/services/murals"
          class="group bg-zinc-900 hover:bg-zinc-800 p-8 rounded-lg transition-colors"
        >
          <Icon name="mdi:brush" class="text-6xl text-lime-400 mb-4 group-hover:scale-110 transition-transform" />
          <h2 class="text-3xl font-bold text-lime-400 mb-3">Themed Rooms & Murals</h2>
          <p class="text-gray-300 mb-4">
            Transform your space with custom-designed murals and themed room artwork. Perfect for homes, 
            businesses, and children's rooms.
          </p>
          <span class="text-lime-400 group-hover:text-lime-300 flex items-center gap-2">
            Learn more <Icon name="mdi:arrow-right" />
          </span>
        </NuxtLink>

        <NuxtLink
          to="/services/framing"
          class="group bg-zinc-900 hover:bg-zinc-800 p-8 rounded-lg transition-colors"
        >
          <Icon name="mdi:image-frame" class="text-6xl text-lime-400 mb-4 group-hover:scale-110 transition-transform" />
          <h2 class="text-3xl font-bold text-lime-400 mb-3">Bespoke Picture Framing</h2>
          <p class="text-gray-300 mb-4">
            Hand-finished, custom picture frames from Tyler Studios. Trusted by galleries, museums, 
            and prestigious artists including Damien Hirst and Tracy Emin.
          </p>
          <span class="text-lime-400 group-hover:text-lime-300 flex items-center gap-2">
            Learn more <Icon name="mdi:arrow-right" />
          </span>
        </NuxtLink>

        <NuxtLink
          to="/services/commissions"
          class="group bg-zinc-900 hover:bg-zinc-800 p-8 rounded-lg transition-colors"
        >
          <Icon name="mdi:palette" class="text-6xl text-lime-400 mb-4 group-hover:scale-110 transition-transform" />
          <h2 class="text-3xl font-bold text-lime-400 mb-3">Commissions</h2>
          <p class="text-gray-300 mb-4">
            Commission bespoke artwork tailored to your vision. From paintings to collages to 
            large-scale installations.
          </p>
          <span class="text-lime-400 group-hover:text-lime-300 flex items-center gap-2">
            Learn more <Icon name="mdi:arrow-right" />
          </span>
        </NuxtLink>

        <NuxtLink
          to="/services/classes"
          class="group bg-zinc-900 hover:bg-zinc-800 p-8 rounded-lg transition-colors"
        >
          <Icon name="mdi:school" class="text-6xl text-lime-400 mb-4 group-hover:scale-110 transition-transform" />
          <h2 class="text-3xl font-bold text-lime-400 mb-3">Classes & Parties</h2>
          <p class="text-gray-300 mb-4">
            Creative art classes, workshops, and party experiences for all ages and skill levels.
          </p>
          <span class="text-lime-400 group-hover:text-lime-300 flex items-center gap-2">
            Learn more <Icon name="mdi:arrow-right" />
          </span>
        </NuxtLink>
      </div>

      <div class="mt-16 text-center bg-zinc-900 rounded-lg p-12">
        <h2 class="text-3xl font-bold text-lime-400 mb-4">Ready to Start Your Project?</h2>
        <p class="text-gray-300 mb-8 max-w-2xl mx-auto">
          Get in touch to discuss your ideas and receive a quote for your custom artwork or service.
        </p>
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
  title: 'Services - Vicky Steane Art',
  meta: [
    { name: 'description', content: 'Professional art services: murals, bespoke framing, commissions, and art classes in London and South West England.' }
  ]
})
</script>
