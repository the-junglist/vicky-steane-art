<template>
  <div class="min-h-screen bg-zinc-950">
    <div class="container mx-auto px-4 py-16 max-w-4xl">
      <div class="mb-8">
        <NuxtLink to="/services" class="text-lime-400 hover:text-lime-300 flex items-center gap-2 mb-4">
          <Icon name="mdi:arrow-left" /> Back to Services
        </NuxtLink>
        <h1 class="text-5xl font-bold text-lime-400 mb-4">Classes & Parties</h1>
      </div>

      <div class="prose prose-invert prose-lg max-w-none">
        <div class="bg-zinc-900 rounded-lg p-8 mb-8">
          <p class="text-gray-300 leading-relaxed">
            Creative art classes, workshops, and party experiences for all ages and skill levels. 
            Whether you're a complete beginner or looking to develop specific techniques, I provide 
            engaging and inspiring art instruction.
          </p>
        </div>

        <div class="bg-zinc-900 rounded-lg p-8 mb-8">
          <h2 class="text-3xl text-lime-400 mb-4">What I Offer</h2>
          <div class="space-y-6">
            <div>
              <h3 class="text-2xl font-bold text-lime-400 mb-3">Art Classes</h3>
              <ul class="text-gray-300 space-y-2">
                <li class="flex items-start gap-3">
                  <Icon name="mdi:circle-small" class="text-lime-400 text-2xl mt-1 flex-shrink-0" />
                  <span>Painting workshops (acrylic, mixed media)</span>
                </li>
                <li class="flex items-start gap-3">
                  <Icon name="mdi:circle-small" class="text-lime-400 text-2xl mt-1 flex-shrink-0" />
                  <span>Collage and mixed media techniques</span>
                </li>
                <li class="flex items-start gap-3">
                  <Icon name="mdi:circle-small" class="text-lime-400 text-2xl mt-1 flex-shrink-0" />
                  <span>Drawing and illustration</span>
                </li>
                <li class="flex items-start gap-3">
                  <Icon name="mdi:circle-small" class="text-lime-400 text-2xl mt-1 flex-shrink-0" />
                  <span>One-on-one tuition or group classes</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="text-2xl font-bold text-lime-400 mb-3">Art Parties</h3>
              <ul class="text-gray-300 space-y-2">
                <li class="flex items-start gap-3">
                  <Icon name="mdi:circle-small" class="text-lime-400 text-2xl mt-1 flex-shrink-0" />
                  <span>Children's birthday parties</span>
                </li>
                <li class="flex items-start gap-3">
                  <Icon name="mdi:circle-small" class="text-lime-400 text-2xl mt-1 flex-shrink-0" />
                  <span>Adult creative workshops</span>
                </li>
                <li class="flex items-start gap-3">
                  <Icon name="mdi:circle-small" class="text-lime-400 text-2xl mt-1 flex-shrink-0" />
                  <span>Team building events</span>
                </li>
                <li class="flex items-start gap-3">
                  <Icon name="mdi:circle-small" class="text-lime-400 text-2xl mt-1 flex-shrink-0" />
                  <span>Special occasion celebrations</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="text-2xl font-bold text-lime-400 mb-3">International Experience</h3>
              <p class="text-gray-300">
                I've taught art classes internationally, including workshops in Cambodia, bringing 
                creative education to diverse communities and students of all backgrounds.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-zinc-900 rounded-lg p-8">
          <h2 class="text-3xl text-lime-400 mb-4">Class Options</h2>
          <div class="grid md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h3 class="text-xl font-bold text-lime-400 mb-2">Location</h3>
              <p>Classes can be held at my studio, your venue, or online</p>
            </div>
            <div>
              <h3 class="text-xl font-bold text-lime-400 mb-2">Group Size</h3>
              <p>From intimate one-on-one sessions to large group workshops</p>
            </div>
            <div>
              <h3 class="text-xl font-bold text-lime-400 mb-2">Duration</h3>
              <p>Single sessions or multi-week courses available</p>
            </div>
            <div>
              <h3 class="text-xl font-bold text-lime-400 mb-2">All Ages</h3>
              <p>Children, teens, adults - everyone welcome!</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 text-center">
        <NuxtLink
          to="/contact"
          class="inline-block bg-lime-500 hover:bg-lime-400 text-zinc-950 font-bold py-3 px-8 rounded-lg transition-colors"
        >
          Book a Class or Party
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Art Classes & Parties - Vicky Steane Art',
  meta: [
    { name: 'description', content: 'Creative art classes, workshops, and party experiences for all ages. Birthday parties, team building, and private tuition available.' }
  ]
})
</script>
