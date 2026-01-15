<template>
  <div class="min-h-screen bg-zinc-950">
    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Image Grid -->
      <div class="absolute inset-0 grid grid-cols-3 md:grid-cols-6 gap-0">
        <div v-for="(image, index) in heroImages" :key="index" class="relative overflow-hidden">
          <NuxtImg
            :src="image"
            :alt="`Artwork ${index + 1}`"
            class="w-full h-full object-cover opacity-40"
            loading="eager"
            :style="{ animationDelay: `${index * 0.1}s` }"
          />
        </div>
      </div>
      
      <!-- Gradient Overlays -->
      <div class="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/70 to-zinc-950"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-zinc-950/50 via-transparent to-zinc-950/50"></div>
      
      <!-- Content -->
      <div class="relative z-10 text-center px-4">
        <h1 class="text-6xl md:text-8xl font-display text-lime-400 mb-6 drop-shadow-lg">
          Vicky Steane
        </h1>
        <p class="text-2xl md:text-3xl text-gray-300 mb-8 drop-shadow-md font-medium">
          Artist & Illustrator
        </p>
        <p class="text-xl text-gray-400 max-w-2xl mx-auto mb-12 drop-shadow-md">
          Creating bespoke murals, paintings, collages, and illustrations for over 20 years
        </p>
        <div class="flex gap-4 justify-center flex-wrap">
          <NuxtLink
            to="/portfolio"
            class="bg-lime-500 hover:bg-lime-400 text-zinc-950 font-bold py-4 px-8 rounded-lg transition-colors shadow-lg"
          >
            View Portfolio
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="bg-zinc-800 hover:bg-zinc-700 text-lime-400 font-bold py-4 px-8 rounded-lg transition-colors border-2 border-lime-500 shadow-lg"
          >
            Get In Touch
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Services Preview -->
    <section class="container mx-auto px-4 py-24">
      <h2 class="text-5xl font-display text-lime-400 mb-12 text-center">Services</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <NuxtLink
          to="/services/murals"
          class="bg-zinc-900 hover:bg-zinc-800 p-8 rounded-lg transition-colors group"
        >
          <Icon name="mdi:brush" class="text-5xl text-lime-400 mb-4" />
          <h3 class="text-2xl font-bold text-lime-400 mb-3">Murals & Commissions</h3>
          <p class="text-gray-400">Large-scale painted wall murals for homes and businesses</p>
        </NuxtLink>

        <NuxtLink
          to="/services/framing"
          class="bg-zinc-900 hover:bg-zinc-800 p-8 rounded-lg transition-colors group"
        >
          <Icon name="mdi:image-frame" class="text-5xl text-lime-400 mb-4" />
          <h3 class="text-2xl font-bold text-lime-400 mb-3">Bespoke Framing</h3>
          <p class="text-gray-400">Hand-finished picture frames from Tyler Studios</p>
        </NuxtLink>

        <NuxtLink
          to="/services/classes"
          class="bg-zinc-900 hover:bg-zinc-800 p-8 rounded-lg transition-colors group"
        >
          <Icon name="mdi:school" class="text-5xl text-lime-400 mb-4" />
          <h3 class="text-2xl font-bold text-lime-400 mb-3">Classes & Parties</h3>
          <p class="text-gray-400">Art classes and creative workshops for all ages</p>
        </NuxtLink>

        <NuxtLink
          to="/services"
          class="bg-zinc-900 hover:bg-zinc-800 p-8 rounded-lg transition-colors group"
        >
          <Icon name="mdi:palette" class="text-5xl text-lime-400 mb-4" />
          <h3 class="text-2xl font-bold text-lime-400 mb-3">All Services</h3>
          <p class="text-gray-400">Explore all creative services and offerings</p>
        </NuxtLink>
      </div>
    </section>

    <!-- Portfolio Preview -->
    <section class="bg-zinc-900 py-24">
      <div class="container mx-auto px-4">
        <h2 class="text-5xl font-display text-lime-400 mb-12 text-center">Featured Work</h2>
        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <NuxtLink to="/portfolio/paintings" class="group">
            <div class="aspect-square bg-zinc-800 rounded-lg overflow-hidden mb-4 relative">
              <NuxtImg
                src="/img/portfolio/paintings/barcelona.jpeg"
                alt="Paintings Portfolio"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/50 to-transparent"></div>
            </div>
            <h3 class="text-xl font-bold text-lime-400 group-hover:text-lime-300">Paintings</h3>
            <p class="text-gray-400">Mixed media & acrylic works</p>
          </NuxtLink>

          <NuxtLink to="/portfolio/collages" class="group">
            <div class="aspect-square bg-zinc-800 rounded-lg overflow-hidden mb-4 relative">
              <NuxtImg
                src="/img/portfolio/collages/Map+Kingfisher.jpg"
                alt="Collages Portfolio"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/50 to-transparent"></div>
            </div>
            <h3 class="text-xl font-bold text-lime-400 group-hover:text-lime-300">Collages</h3>
            <p class="text-gray-400">Intricate map collages</p>
          </NuxtLink>

          <NuxtLink to="/portfolio/murals" class="group">
            <div class="aspect-square bg-zinc-800 rounded-lg overflow-hidden mb-4 relative">
              <NuxtImg
                src="/img/portfolio/murals/BOOMTOWN.jpg"
                alt="Murals Portfolio"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/50 to-transparent"></div>
            </div>
            <h3 class="text-xl font-bold text-lime-400 group-hover:text-lime-300">Murals</h3>
            <p class="text-gray-400">Large-scale commissions</p>
          </NuxtLink>
        </div>
        <div class="text-center">
          <NuxtLink
            to="/portfolio"
            class="inline-block bg-lime-500 hover:bg-lime-400 text-zinc-950 font-bold py-3 px-8 rounded-lg transition-colors"
          >
            View Full Portfolio
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Hero background images - mix from all categories
const heroImages = [
  // Row 1
  '/img/portfolio/paintings/barcelona.jpeg',
  '/img/portfolio/collages/Map+Kingfisher.jpg',
  '/img/portfolio/murals/BOOMTOWN.jpg',
  '/img/portfolio/illustrations/Robot+1+2021.jpg',
  '/img/portfolio/paintings/heron.jpg',
  '/img/portfolio/collages/deer.jpg',
  
  // Row 2 (hidden on mobile, shown on md+)
  '/img/portfolio/murals/TEMPLE.jpg',
  '/img/portfolio/paintings/detroit.jpg',
  '/img/portfolio/illustrations/polar+bear.jpg',
  '/img/portfolio/collages/robin.jpeg',
  '/img/portfolio/murals/BOB+BAR.jpg',
  '/img/portfolio/paintings/blue-panels---web.jpg',
]

useHead({
  title: 'Vicky Steane Art - Custom Murals, Paintings & Commissions',
  meta: [
    { name: 'description', content: 'Established London artist with 20+ years experience. Specializing in murals, collages, paintings, and illustrations. Tyler Studios owner.' }
  ]
})
</script>

<style scoped>
/* Subtle animation for hero images */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(1.1);
  }
  to {
    opacity: 0.4;
    transform: scale(1);
  }
}

.grid > div img {
  animation: fadeIn 1s ease-out forwards;
}
</style>
