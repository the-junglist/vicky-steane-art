<script lang="ts" setup>
interface Props {
  initialPosts: any[]
}

const props = defineProps<Props>()

// State
const posts = ref([...props.initialPosts])
const currentPage = ref(1)
const perPage = 20
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
</script>

<template>
  <div>
    <!-- Posts Grid -->
    <div 
      v-if="posts && posts.length > 0" 
      class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <PortfolioPostCard 
        v-for="(post, index) in posts" 
        :key="post.id" 
        :post="post"
        :priority="index < 4"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="rounded-lg bg-zinc-900/50 border border-zinc-800 p-8 text-center text-gray-400">
      <p class="text-xl">No portfolio posts found</p>
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
        <p class="font-medium">All {{ posts.length }} projects loaded</p>
        <p class="text-sm mt-1">You've reached the end of the timeline</p>
      </div>
    </div>
  </div>
</template>
