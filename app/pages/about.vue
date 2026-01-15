<template>
  <div class="min-h-screen bg-zinc-950">
    <div class="container mx-auto px-4 py-16 max-w-6xl">
      <h1 class="text-5xl font-bold text-lime-400 mb-8">About Vicky Steane</h1>
      
      <div class="prose prose-invert prose-lg max-w-none">
        <!-- Artist Profile Section -->
        <div class="bg-zinc-900 rounded-lg p-8 mb-8">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 class="text-3xl text-lime-400 mb-4">The Artist</h2>
              <p class="text-gray-300 leading-relaxed">
                I am an established London artist and illustrator based in the South West of England and London.
                I use a wide range of materials to create a diverse collection of different types of artwork;
                from intricate collages using old maps, to large-scale painted wall murals, mixed media acrylic
                paintings, and biro illustrations. Over the last 20+ years I have created different styles of
                original art prints, illustrated art prints, creative wall art, and affordable art prints with personality.
              </p>
              <p class="text-gray-300 leading-relaxed mt-4">
                Many of these paintings are now available as prints, clothing, and more! If you are looking for
                some unique clothing or London-inspired artwork for sale, or quirky and original gifts, then please
                visit the shop!
              </p>
            </div>
            <div>
              <NuxtImg 
                src="/img/about/VS+Profile+Pic+5+Robots.jpg" 
                alt="Vicky Steane with Robot Art"
                class="rounded-lg w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <!-- Tyler Studios Section -->
        <div class="bg-zinc-900 rounded-lg p-8 mb-8">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div class="order-2 md:order-1">
              <NuxtImg 
                src="/img/about/Tyler+Studios+1.jpg" 
                alt="Tyler Studios Gallery"
                class="rounded-lg w-full"
                loading="lazy"
              />
            </div>
            <div class="order-1 md:order-2">
              <h2 class="text-3xl text-lime-400 mb-4">Tyler Studios</h2>
              <p class="text-gray-300 leading-relaxed">
                I ran my own picture framing gallery, <strong class="text-lime-400">Tyler Studios</strong>, on Eel Pie Island
                in Twickenham for over 16 years, selling my own artwork and creating hand-finished, bespoke picture
                frames for numerous works of art.. including a Picasso in The London Museum, and exhibitions for
                Tate Gallery and Battersea Power Station Museum.
              </p>
              <p class="text-gray-300 leading-relaxed mt-4">
                My clients include <strong class="text-lime-400">Damien Hirst</strong>,
                <strong class="text-lime-400">Tracy Emin</strong> and other Turner Prize winners.
                Looking for a professional framing service for your art? Get in touch!
              </p>
            </div>
          </div>
        </div>

        <!-- Story Telling Section -->
        <div class="bg-zinc-900 rounded-lg p-8">
          <h2 class="text-3xl text-lime-400 mb-4">Story Telling</h2>
          <p class="text-gray-300 leading-relaxed">
            I also spend my time mixing stories, poems, and original artwork to explore positive thoughts,
            ideas, and concepts about the world around us. Some of these concepts and ideas I not only painted,
            but also turned into children's books of illustrated robot art for kids and collectors. Each book
            is designed to inspire creativity and contains a moral message.
          </p>
          <p class="text-gray-300 leading-relaxed mt-4">
            Book number 1 <strong class="text-lime-400">"There Was A Little Robot"</strong> from this delightful
            series of children's books is available to download online and in select bookstores.
          </p>
        </div>
      </div>

      <div class="mt-12 text-center">
        <NuxtLink 
          to="/contact" 
          class="inline-block bg-lime-500 hover:bg-lime-400 text-zinc-950 font-bold py-3 px-8 rounded-lg transition-colors"
        >
          Get In Touch
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'About Vicky Steane - Artist & Illustrator',
  meta: [
    { name: 'description', content: 'Established London artist with 20+ years experience. Tyler Studios owner, creating bespoke frames for Damien Hirst, Tracy Emin, and Turner Prize winners.' }
  ]
})
</script>
