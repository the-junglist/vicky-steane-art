<template>
  <div class="min-h-screen bg-zinc-950">
    <div class="container mx-auto px-4 py-16 max-w-4xl">
      <div class="mb-8">
        <NuxtLink to="/services" class="text-lime-400 hover:text-lime-300 flex items-center gap-2 mb-4">
          <Icon name="mdi:arrow-left" /> Back to Services
        </NuxtLink>
        <h1 class="text-5xl font-bold text-lime-400 mb-4">Themed Rooms & Murals</h1>
      </div>

      <div class="prose prose-invert prose-lg max-w-none">
        <div class="bg-zinc-900 rounded-lg p-8 mb-8">
          <p class="text-gray-300 leading-relaxed">
            Transform any space with custom-designed murals and themed room artwork. Whether you're looking 
            to create a magical children's bedroom, an inspiring office space, or a stunning feature wall, 
            I bring your vision to life with hand-painted artistry.
          </p>
        </div>

        <div class="bg-zinc-900 rounded-lg p-8 mb-8">
          <h2 class="text-3xl text-lime-400 mb-4">What I Offer</h2>
          <ul class="text-gray-300 space-y-3">
            <li class="flex items-start gap-3">
              <Icon name="mdi:check-circle" class="text-lime-400 text-2xl mt-1 flex-shrink-0" />
              <span>Custom mural designs tailored to your space and style</span>
            </li>
            <li class="flex items-start gap-3">
              <Icon name="mdi:check-circle" class="text-lime-400 text-2xl mt-1 flex-shrink-0" />
              <span>Themed children's rooms (fantasy, space, jungle, underwater, etc.)</span>
            </li>
            <li class="flex items-start gap-3">
              <Icon name="mdi:check-circle" class="text-lime-400 text-2xl mt-1 flex-shrink-0" />
              <span>Commercial spaces (offices, restaurants, retail)</span>
            </li>
            <li class="flex items-start gap-3">
              <Icon name="mdi:check-circle" class="text-lime-400 text-2xl mt-1 flex-shrink-0" />
              <span>Feature walls and statement pieces</span>
            </li>
            <li class="flex items-start gap-3">
              <Icon name="mdi:check-circle" class="text-lime-400 text-2xl mt-1 flex-shrink-0" />
              <span>Restoration and touch-ups of existing murals</span>
            </li>
          </ul>
        </div>

        <div class="bg-zinc-900 rounded-lg p-8">
          <h2 class="text-3xl text-lime-400 mb-4">The Process</h2>
          <ol class="text-gray-300 space-y-4">
            <li class="flex gap-4">
              <span class="text-2xl font-bold text-lime-400">1.</span>
              <div>
                <strong class="text-lime-400">Consultation:</strong> We discuss your ideas, space, and budget
              </div>
            </li>
            <li class="flex gap-4">
              <span class="text-2xl font-bold text-lime-400">2.</span>
              <div>
                <strong class="text-lime-400">Design:</strong> I create concept sketches for your approval
              </div>
            </li>
            <li class="flex gap-4">
              <span class="text-2xl font-bold text-lime-400">3.</span>
              <div>
                <strong class="text-lime-400">Painting:</strong> Professional on-site mural creation
              </div>
            </li>
            <li class="flex gap-4">
              <span class="text-2xl font-bold text-lime-400">4.</span>
              <div>
                <strong class="text-lime-400">Final Touches:</strong> Details and finishing work
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
          Request a Quote
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Themed Rooms & Murals - Vicky Steane Art',
  meta: [
    { name: 'description', content: 'Custom mural design and themed room artwork for homes and businesses by Vicky Steane.' }
  ]
})
</script>
