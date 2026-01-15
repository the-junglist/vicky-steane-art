<template>
  <div class="min-h-screen bg-zinc-950">
    <div class="container mx-auto px-4 py-16">
      <div class="mb-8">
        <NuxtLink to="/portfolio" class="text-lime-400 hover:text-lime-300 flex items-center gap-2 mb-4">
          <Icon name="mdi:arrow-left" /> Back to Portfolio
        </NuxtLink>
        <h1 class="text-5xl font-bold text-lime-400 mb-4">Illustrations</h1>
        <p class="text-xl text-gray-400 max-w-3xl">
          Detailed biro drawings, sketches, and illustrations including robot art and children's book illustrations.
        </p>
      </div>

      <GalleryImageGrid :images="galleryImages" />
    </div>
  </div>
</template>

<script setup lang="ts">
const galleryImages = ref([
  '/img/portfolio/illustrations/126054260_1006190803214328_8425250673002680074_n.jpg',
  '/img/portfolio/illustrations/126081259_1264921417221893_4910583621668235277_n.jpg',
  '/img/portfolio/illustrations/126169978_200779881516150_6690100131665030834_n+%282%29.jpg',
  '/img/portfolio/illustrations/126526596_1007779806411358_6858874870136064638_n+%281%29.jpg',
  '/img/portfolio/illustrations/126906764_1574337626086447_4239099845992064682_n.jpg',
  '/img/portfolio/illustrations/126974983_131238938476157_2321359750476202685_n.jpg',
  '/img/portfolio/illustrations/152422502_3993858927291596_8030509936354752170_n.jpg',
  '/img/portfolio/illustrations/152938162_798772444069897_3311024567139071846_n.jpg',
  '/img/portfolio/illustrations/153110833_2877697329149472_8824813773491005454_n.jpg',
  '/img/portfolio/illustrations/154288384_257078972546411_2331759415615193259_n.jpg',
  '/img/portfolio/illustrations/16123388_1833634950236342_6913830841755893760_n.jpg',
  '/img/portfolio/illustrations/Eel+Pie+bridge.jpg',
  '/img/portfolio/illustrations/fc075a0a-a64d-4b1d-a7cb-7bf335a3858d.jpeg',
  '/img/portfolio/illustrations/IMG_0430.jpg',
  '/img/portfolio/illustrations/IMG_20200930_145445_855.jpg',
  '/img/portfolio/illustrations/IMG_2732-1.jpg',
  '/img/portfolio/illustrations/IMG_3814-1.jpg',
  '/img/portfolio/illustrations/IMG_3815-1.jpg',
  '/img/portfolio/illustrations/IMG_3816-1.jpg',
  '/img/portfolio/illustrations/IMG_3817-1.jpg',
  '/img/portfolio/illustrations/IMG_3819-1.jpg',
  '/img/portfolio/illustrations/IMG_3820-1.jpg',
  '/img/portfolio/illustrations/IMG_3822-1.jpg',
  '/img/portfolio/illustrations/IMG_3825-1.jpg',
  '/img/portfolio/illustrations/IMG_4017.jpg',
  '/img/portfolio/illustrations/IMG_4024.jpg',
  '/img/portfolio/illustrations/IMG_4030.jpg',
  '/img/portfolio/illustrations/IMG_4033.jpg',
  '/img/portfolio/illustrations/IMG_4035.jpg',
  '/img/portfolio/illustrations/IMG_4040.jpg',
  '/img/portfolio/illustrations/kate+eliza.jpeg',
  '/img/portfolio/illustrations/leighton.jpeg',
  '/img/portfolio/illustrations/mermaid+portrait+2.jpeg',
  '/img/portfolio/illustrations/pirate+eliza.jpeg',
  '/img/portfolio/illustrations/polar+bear.jpg',
  '/img/portfolio/illustrations/Robot+1+2021.jpg',
])

useHead({
  title: 'Illustrations - Vicky Steane Art',
  meta: [
    { name: 'description', content: 'Biro drawings and illustrations by Vicky Steane.' }
  ]
})
</script>
