<script setup lang="ts">
interface Post {
  id: number
  title: { rendered: string }
  excerpt: { rendered: string }
  slug: string
  date: string
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
    }>
  }
}

interface Props {
  post: Post
  priority?: boolean  // New prop for priority loading
}

const props = defineProps<Props>()

const featuredImage = computed(() => {
  return props.post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/img/placeholder.jpg'
})

const altText = computed(() => {
  return props.post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || props.post.title.rendered
})

const formattedDate = computed(() => {
  return new Date(props.post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<template>
  <article class="group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-lg transition-all duration-300 hover:border-lime-500/50 hover:shadow-lg hover:shadow-lime-500/10">
    <NuxtLink :to="`/portfolio/${post.slug}`" class="block">
      <!-- Featured Image -->
      <div class="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
        <NuxtImg 
          :src="featuredImage" 
          :alt="altText || 'Portfolio project thumbnail'"
          format="webp"
          quality="80"
          sizes="xs:100vw sm:50vw md:33vw lg:25vw"
          width="600"
          height="450"
          :loading="priority ? 'eager' : 'lazy'"
          decoding="async"
          class="h-full w-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:opacity-80"
        />
      </div>
      
      <!-- Content -->
      <div class="p-4">
        <h2 
          class="text-lg font-semibold text-white transition-colors group-hover:text-lime-400" 
          v-html="post.title.rendered"
        ></h2>
        <div 
          class="mt-2 line-clamp-3 text-sm text-gray-400" 
          v-html="post.excerpt.rendered"
        ></div>
        <div class="mt-4 text-sm text-lime-400 font-medium group-hover:text-lime-300 transition-colors">
          View More →
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
