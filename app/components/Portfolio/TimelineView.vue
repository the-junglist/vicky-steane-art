<script lang="ts" setup>
interface Props {
  initialPosts: any[]
  tags: any[]
}

const props = defineProps<Props>()

// State
const posts = ref([...props.initialPosts])
const currentPage = ref(1)
const perPage = 50
const loading = ref(false)
const hasMore = ref(props.initialPosts.length === perPage)

// Load more posts
const loadMore = async () => {
  if (loading.value || !hasMore.value) return
  
  loading.value = true
  const nextPage = currentPage.value + 1
  
  try {
    const newPosts = await $fetch('/api/wordpress/posts', {
      params: {
        per_page: perPage,
        page: nextPage,
        orderby: 'date',
        order: 'desc'
      }
    })
    
    if (newPosts && newPosts.length > 0) {
      // Append new posts to existing array
      posts.value = [...posts.value, ...newPosts]
      currentPage.value = nextPage
      
      // Check if there are more posts
      hasMore.value = newPosts.length === perPage
    } else {
      hasMore.value = false
    }
  } catch (error) {
    console.error('Failed to load more posts:', error)
    hasMore.value = false
  } finally {
    loading.value = false
  }
}

// Create a map of tag ID to tag name
const tagMap = computed(() => {
  if (!props.tags) return {}
  const map: Record<number, string> = {}
  props.tags.forEach((tag: any) => {
    map[tag.id] = tag.name
  })
  return map
})

// Group posts by year from tags (4-digit year tags ONLY)
const postsByYear = computed(() => {
  if (!posts.value || !props.tags) return {}
  
  const grouped: Record<string, any[]> = {}
  
  posts.value.forEach((post: any) => {
    // Find a year tag (4-digit number between 1999-2026)
    let yearTag = null
    if (post.tags && post.tags.length > 0) {
      for (const tagId of post.tags) {
        const tagName = tagMap.value[tagId]
        if (tagName && /^\d{4}$/.test(tagName)) {
          const year = parseInt(tagName)
          if (year >= 1999 && year <= 2026) {
            yearTag = tagName
            break
          }
        }
      }
    }
    
    // Only include posts that have a year tag
    if (yearTag) {
      if (!grouped[yearTag]) {
        grouped[yearTag] = []
      }
      grouped[yearTag].push(post)
    }
  })
  
  return grouped
})

// Sort order state for timeline
const isAscending = ref(false)

// Get sorted years (default newest first, toggleable)
const years = computed(() => {
  const sorted = Object.keys(postsByYear.value).sort((a, b) => parseInt(b) - parseInt(a))
  return isAscending.value ? sorted.reverse() : sorted
})

const toggleOrder = () => {
  isAscending.value = !isAscending.value
}
</script>

<template>
  <div>
    <!-- Sort Toggle -->
    <div class="mb-12 flex justify-center">
      <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 inline-block">
        <button 
          @click="toggleOrder"
          class="flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 font-medium"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          <span>{{ isAscending ? 'Newest First' : 'Oldest First' }}</span>
        </button>
        
        <div class="flex items-center justify-center gap-4 text-sm mt-4">
          <Transition name="slide-fade" mode="out-in">
            <span :key="isAscending ? 'old' : 'new'" class="text-gray-500">
              {{ isAscending ? (years[0] || '1999') : (years[years.length - 1] || '1999') }}
            </span>
          </Transition>
          <div class="w-32 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
          <Transition name="slide-fade" mode="out-in">
            <span :key="isAscending ? 'new' : 'old'" class="text-gray-500">
              {{ isAscending ? (years[years.length - 1] || '2026') : (years[0] || '2026') }}
            </span>
          </Transition>
        </div>
      </div>
    </div>

    <!-- Timeline -->
    <div class="relative max-w-7xl mx-auto">
      <!-- Vertical line with glow effect -->
      <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full">
        <div class="w-full h-full bg-gradient-to-b from-emerald-500 via-green-500 to-teal-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]"></div>
      </div>

      <!-- Year sections -->
      <div v-for="(year, index) in years" :key="year" class="mb-32 relative">
        <!-- Year marker -->
        <div class="flex items-center justify-center mb-12 relative">
          <!-- Glow effect -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-32 h-32 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          </div>
          <!-- Badge -->
          <div class="relative bg-zinc-700 border border-emerald-500 text-white px-8 py-4 rounded-lg text-3xl font-normal z-20">
            {{ year }}
          </div>
        </div>

        <!-- Posts for this year -->
        <div class="space-y-8">
          <div 
            v-for="(post, postIndex) in postsByYear[year]" 
            :key="post.id"
            :data-post-index="index * 100 + postIndex"
            :class="[
              'flex items-start gap-8',
              postIndex % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            ]"
          >
            <!-- Spacer -->
            <div class="flex-1"></div>

            <!-- Connector dot -->
            <div class="relative flex items-center justify-center">
              <!-- Pulse effect -->
              <div class="absolute w-6 h-6 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
              <!-- Dot -->
              <div class="relative w-6 h-6 bg-white rounded-full border-4 border-emerald-500 shadow-lg shadow-emerald-500/50 z-10"></div>
            </div>

            <!-- Content -->
            <div class="flex-1">
              <NuxtLink 
                :to="`/portfolio/${post.slug}`"
                class="block group"
              >
                <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg overflow-hidden hover:border-emerald-500 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-1">
                  <!-- Image -->
                  <div v-if="post._embedded?.['wp:featuredmedia']?.[0]" class="aspect-video overflow-hidden bg-slate-900">
                    <NuxtImg
                      :src="post._embedded['wp:featuredmedia'][0].source_url"
                      :alt="post.title.rendered || 'Portfolio project thumbnail'"
                      format="webp"
                      quality="75"
                      sizes="xs:100vw sm:80vw md:45vw lg:35vw"
                      width="700"
                      height="394"
                      :loading="index === 0 && postIndex < 3 ? 'eager' : 'lazy'"
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      decoding="async"
                    />
                  </div>

                  <!-- Content -->
                  <div class="p-6">
                    <h3 class="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors" v-html="post.title.rendered"></h3>
                    
                    <div v-if="post.excerpt?.rendered" class="text-gray-400 line-clamp-2" v-html="post.excerpt.rendered"></div>

                    <div class="mt-4 flex items-center text-sm text-emerald-400">
                      <span>View project</span>
                      <svg class="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Timeline End Marker -->
      <div class="flex items-center justify-center mb-12 relative">
        <!-- Glow effect -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-40 h-40 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        </div>
        <!-- Badge -->
        <div class="relative bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 text-white px-10 py-5 rounded-full text-2xl font-bold shadow-2xl z-20">
          🚀 The Beginning
        </div>
      </div>
    </div>

    <!-- Load More Button -->
    <div v-if="hasMore" class="flex justify-center mt-12">
      <button
        @click="loadMore"
        :disabled="loading"
        class="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        <!-- Animated background -->
        <div class="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <!-- Button content -->
        <span class="relative flex items-center gap-3">
          <svg 
            v-if="loading" 
            class="animate-spin h-5 w-5" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          
          <span>{{ loading ? 'Loading...' : 'LOAD MORE' }}</span>
          
          <svg 
            v-if="!loading"
            class="w-5 h-5 group-hover:translate-y-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </span>
      </button>
    </div>

    <!-- All Loaded Message -->
    <div v-else-if="posts.length > 0" class="flex justify-center mt-12">
      <div class="px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg text-gray-400 text-center">
        <svg class="w-8 h-8 mx-auto mb-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="font-medium">Complete timeline loaded</p>
        <p class="text-sm mt-1">{{ posts.length }} projects • 20 years of work</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Year flip transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
