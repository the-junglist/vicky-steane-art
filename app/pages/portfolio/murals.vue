<template>
  <div class="min-h-screen bg-zinc-950">
    <div class="container mx-auto px-4 py-16">
      <div class="mb-8">
        <NuxtLink to="/portfolio" class="text-lime-400 hover:text-lime-300 flex items-center gap-2 mb-4">
          <Icon name="mdi:arrow-left" /> Back to Portfolio
        </NuxtLink>
        <h1 class="text-5xl font-bold text-lime-400 mb-4">Murals & Commissions</h1>
        <p class="text-xl text-gray-400 max-w-3xl">
          Large-scale painted wall murals and commissioned artwork for homes, businesses, and public spaces.
        </p>
      </div>

      <GalleryImageGrid :images="galleryImages" />
    </div>
  </div>
</template>

<script setup lang="ts">
const galleryImages = ref([
  '/img/portfolio/murals/11.JPG',
  '/img/portfolio/murals/16684333_10158317291350722_1810832710607510832_n.jpg',
  '/img/portfolio/murals/29402838_1792399080817324_1720170454003482624_n.jpg',
  '/img/portfolio/murals/42117AC2-64B1-450D-B17A-640088E7540C_1_105_c.jpeg',
  '/img/portfolio/murals/7.jpg',
  '/img/portfolio/murals/BAUHINIA+RESORT.jpg',
  '/img/portfolio/murals/blubell+lightbox+1+lit.jpg',
  '/img/portfolio/murals/BOB+BAR.jpg',
  '/img/portfolio/murals/BOB.jpg',
  '/img/portfolio/murals/boomasone.jpg',
  '/img/portfolio/murals/BOOMTOWN.jpg',
  '/img/portfolio/murals/city+scape+vietnam.jpg',
  '/img/portfolio/murals/IMG_20190528_132824.jpg',
  '/img/portfolio/murals/IMG_3226.jpg',
  '/img/portfolio/murals/IMG_3246.jpg',
  '/img/portfolio/murals/IMG_3426.jpg',
  '/img/portfolio/murals/IMG_3428.jpg',
  '/img/portfolio/murals/IMG_3430.jpg',
  '/img/portfolio/murals/IMG_3431.jpg',
  '/img/portfolio/murals/lightbox+1+web.jpg',
  '/img/portfolio/murals/ny+on+map.jpg',
  '/img/portfolio/murals/ODEONFINISH.jpg',
  '/img/portfolio/murals/paris.jpeg',
  '/img/portfolio/murals/Tomorrowland+Bangkok+Lounge.jpg',
])

useHead({
  title: 'Murals & Commissions - Vicky Steane Art',
  meta: [
    { name: 'description', content: 'Large-scale murals and commissioned artwork by Vicky Steane.' }
  ]
})
</script>
