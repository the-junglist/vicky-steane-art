<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800 transition-transform duration-300"
    :class="{ '-translate-y-full': hideHeader && scrolled }"
  >
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- Logo/Brand -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <NuxtImg
            src="/VS_Logo_New.png"
            alt="Vicky Steane Logo"
            class="h-12 w-auto transition-transform group-hover:scale-105"
            loading="eager"
          />
          <div class="text-2xl font-display text-lime-400 group-hover:text-lime-300 transition-colors">
            Vicky Steane Art
          </div>
        </NuxtLink>

        <!-- Navigation -->
        <BaseNavigation />
      </div>
    </div>
  </header>

  <!-- Spacer to prevent content from going under fixed header -->
  <div class="h-[76px]"></div>
</template>

<script setup lang="ts">
const scrolled = ref(false)
const hideHeader = ref(false)
let lastScrollY = 0

const handleScroll = () => {
  const currentScrollY = window.scrollY
  
  scrolled.value = currentScrollY > 50
  
  // Hide header when scrolling down, show when scrolling up
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    hideHeader.value = true
  } else {
    hideHeader.value = false
  }
  
  lastScrollY = currentScrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
