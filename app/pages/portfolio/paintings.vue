<template>
  <div class="min-h-screen bg-zinc-950">
    <div class="container mx-auto px-4 py-16">
      <div class="mb-8">
        <NuxtLink to="/portfolio" class="text-lime-400 hover:text-lime-300 flex items-center gap-2 mb-4">
          <Icon name="mdi:arrow-left" /> Back to Portfolio
        </NuxtLink>
        <h1 class="text-5xl font-bold text-lime-400 mb-4">Mixed Media/Acrylic Paintings</h1>
        <p class="text-xl text-gray-400 max-w-3xl">
          Original mixed media and acrylic paintings featuring vibrant colors and diverse subjects.
        </p>
      </div>

      <GalleryImageGrid :images="galleryImages" />
    </div>
  </div>
</template>

<script setup lang="ts">
const galleryImages = ref([
  '/img/portfolio/paintings/barcelona.jpeg',
  '/img/portfolio/paintings/blue-panels---web.jpg',
  '/img/portfolio/paintings/claphamjunction-web1.jpg',
  '/img/portfolio/paintings/detroit.jpg',
  '/img/portfolio/paintings/eel+pie+bridge.jpg',
  '/img/portfolio/paintings/heron.jpg',
  '/img/portfolio/paintings/IMG_1960.JPG',
  '/img/portfolio/paintings/IMG_20200213_154827.jpg',
  '/img/portfolio/paintings/Iris.jpg',
  '/img/portfolio/paintings/kingfisher+2.jpg',
  '/img/portfolio/paintings/koi.jpeg',
  '/img/portfolio/paintings/liberty+red+web.jpg',
  '/img/portfolio/paintings/London+buses+wembley.jpg',
  '/img/portfolio/paintings/Los+Angeles+Blue.jpeg',
  '/img/portfolio/paintings/love+island+.jpg',
  '/img/portfolio/paintings/night+train.jpg',
  '/img/portfolio/paintings/NY+skyline.jpg',
  '/img/portfolio/paintings/orange+panels.jpeg',
  '/img/portfolio/paintings/orangr+leaves.jpg',
  '/img/portfolio/paintings/owl+on+red.jpg',
  '/img/portfolio/paintings/panel+1.jpg',
  '/img/portfolio/paintings/panel+4.jpg',
  '/img/portfolio/paintings/pink+panther.jpg',
  '/img/portfolio/paintings/plum.jpg',
  '/img/portfolio/paintings/purple+panel+2.jpeg',
  '/img/portfolio/paintings/purple-panel-2-copy.jpg',
  '/img/portfolio/paintings/rabbit+pink+.jpg',
  '/img/portfolio/paintings/robin+pink+.jpg',
  '/img/portfolio/paintings/Sunflower.jpeg',
  '/img/portfolio/paintings/textile+sample1.jpg',
  '/img/portfolio/paintings/textile.jpg',
  '/img/portfolio/paintings/Tomorrowland+Bangkok+Lounge.jpg',
  '/img/portfolio/paintings/toucans+.jpg',
  '/img/portfolio/paintings/toucan.jpg',
  '/img/portfolio/paintings/tyler+studios+painting.jpeg',
  '/img/portfolio/paintings/tyler.jpeg',
  '/img/portfolio/paintings/Waterlily+panel+2.jpg',
])

useHead({
  title: 'Paintings - Vicky Steane Art',
  meta: [
    { name: 'description', content: 'Mixed media and acrylic paintings by Vicky Steane.' }
  ]
})
</script>
