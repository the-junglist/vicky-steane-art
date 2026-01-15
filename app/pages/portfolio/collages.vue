<template>
  <div class="min-h-screen bg-zinc-950">
    <div class="container mx-auto px-4 py-16">
      <div class="mb-8">
        <NuxtLink to="/portfolio" class="text-lime-400 hover:text-lime-300 flex items-center gap-2 mb-4">
          <Icon name="mdi:arrow-left" /> Back to Portfolio
        </NuxtLink>
        <h1 class="text-5xl font-bold text-lime-400 mb-4">Collage Collections</h1>
        <p class="text-xl text-gray-400 max-w-3xl">
          Intricate collages created using old maps, vintage papers, and mixed media elements.
        </p>
      </div>

      <GalleryImageGrid :images="galleryImages" />
    </div>
  </div>
</template>

<script setup lang="ts">
const galleryImages = ref([
  '/img/portfolio/collages/20250308_230925.jpg',
  '/img/portfolio/collages/daffodils.jpeg',
  '/img/portfolio/collages/deer.jpg',
  '/img/portfolio/collages/IMG_0627.JPG',
  '/img/portfolio/collages/IMG_20200820_110559_120.jpg',
  '/img/portfolio/collages/LTCM+High+Res+OpenArt.png',
  '/img/portfolio/collages/Map+1.jpg',
  '/img/portfolio/collages/Map+Kingfisher.jpg',
  '/img/portfolio/collages/Map+Shark.jpg',
  '/img/portfolio/collages/received_1008358674596226.jpeg',
  '/img/portfolio/collages/robin.jpeg',
])

useHead({
  title: 'Collages - Vicky Steane Art',
  meta: [
    { name: 'description', content: 'Intricate map and paper collages by Vicky Steane.' }
  ]
})
</script>
