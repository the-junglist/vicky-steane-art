<template>
  <nav class="flex items-center gap-8">
    <!-- Desktop Navigation -->
    <div class="hidden lg:flex items-center gap-6">
      <NuxtLink
        to="/"
        class="text-gray-300 hover:text-lime-400 transition-colors font-medium"
        :class="{ 'text-lime-400': $route.path === '/' }"
      >
        Home
      </NuxtLink>
      
      <NuxtLink
        to="/about"
        class="text-gray-300 hover:text-lime-400 transition-colors font-medium"
        :class="{ 'text-lime-400': $route.path === '/about' }"
      >
        About
      </NuxtLink>
      
      <div class="relative group">
        <NuxtLink
          to="/portfolio"
          class="text-gray-300 hover:text-lime-400 transition-colors font-medium flex items-center gap-1"
          :class="{ 'text-lime-400': $route.path.startsWith('/portfolio') }"
        >
          Portfolio
          <Icon name="mdi:chevron-down" class="text-sm" />
        </NuxtLink>
        <div class="absolute top-full left-0 mt-2 w-48 bg-zinc-900 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
          <NuxtLink to="/portfolio/paintings" class="block px-4 py-3 text-gray-300 hover:text-lime-400 hover:bg-zinc-800 rounded-t-lg">
            Paintings
          </NuxtLink>
          <NuxtLink to="/portfolio/collages" class="block px-4 py-3 text-gray-300 hover:text-lime-400 hover:bg-zinc-800">
            Collages
          </NuxtLink>
          <NuxtLink to="/portfolio/murals" class="block px-4 py-3 text-gray-300 hover:text-lime-400 hover:bg-zinc-800">
            Murals
          </NuxtLink>
          <NuxtLink to="/portfolio/illustrations" class="block px-4 py-3 text-gray-300 hover:text-lime-400 hover:bg-zinc-800 rounded-b-lg">
            Illustrations
          </NuxtLink>
        </div>
      </div>

      <div class="relative group">
        <NuxtLink
          to="/services"
          class="text-gray-300 hover:text-lime-400 transition-colors font-medium flex items-center gap-1"
          :class="{ 'text-lime-400': $route.path.startsWith('/services') }"
        >
          Services
          <Icon name="mdi:chevron-down" class="text-sm" />
        </NuxtLink>
        <div class="absolute top-full left-0 mt-2 w-56 bg-zinc-900 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
          <NuxtLink to="/services/murals" class="block px-4 py-3 text-gray-300 hover:text-lime-400 hover:bg-zinc-800 rounded-t-lg">
            Themed Rooms & Murals
          </NuxtLink>
          <NuxtLink to="/services/framing" class="block px-4 py-3 text-gray-300 hover:text-lime-400 hover:bg-zinc-800">
            Bespoke Framing
          </NuxtLink>
          <NuxtLink to="/services/commissions" class="block px-4 py-3 text-gray-300 hover:text-lime-400 hover:bg-zinc-800">
            Commissions
          </NuxtLink>
          <NuxtLink to="/services/classes" class="block px-4 py-3 text-gray-300 hover:text-lime-400 hover:bg-zinc-800 rounded-b-lg">
            Classes & Parties
          </NuxtLink>
        </div>
      </div>

      <NuxtLink
        to="/faqs"
        class="text-gray-300 hover:text-lime-400 transition-colors font-medium"
        :class="{ 'text-lime-400': $route.path === '/faqs' }"
      >
        FAQs
      </NuxtLink>
      
      <NuxtLink
        to="/contact"
        class="bg-lime-500 hover:bg-lime-400 text-zinc-950 font-bold py-2 px-6 rounded-lg transition-colors"
      >
        Contact
      </NuxtLink>
    </div>

    <!-- Mobile Menu Button -->
    <button
      @click="mobileMenuOpen = !mobileMenuOpen"
      class="lg:hidden text-lime-400 text-3xl"
      aria-label="Toggle menu"
    >
      <Icon :name="mobileMenuOpen ? 'mdi:close' : 'mdi:menu'" />
    </button>

    <!-- Mobile Menu -->
    <Teleport to="body">
      <div
        v-if="mobileMenuOpen"
        class="fixed inset-0 bg-zinc-950 z-40 lg:hidden overflow-y-auto"
        @click="mobileMenuOpen = false"
      >
        <div class="container mx-auto px-4 py-24">
          <nav class="flex flex-col gap-6">
            <NuxtLink to="/" class="text-2xl text-gray-300 hover:text-lime-400">Home</NuxtLink>
            <NuxtLink to="/about" class="text-2xl text-gray-300 hover:text-lime-400">About</NuxtLink>
            <div>
              <NuxtLink to="/portfolio" class="text-2xl text-lime-400 font-bold mb-3 block">Portfolio</NuxtLink>
              <div class="ml-4 flex flex-col gap-3">
                <NuxtLink to="/portfolio/paintings" class="text-xl text-gray-300 hover:text-lime-400">Paintings</NuxtLink>
                <NuxtLink to="/portfolio/collages" class="text-xl text-gray-300 hover:text-lime-400">Collages</NuxtLink>
                <NuxtLink to="/portfolio/murals" class="text-xl text-gray-300 hover:text-lime-400">Murals</NuxtLink>
                <NuxtLink to="/portfolio/illustrations" class="text-xl text-gray-300 hover:text-lime-400">Illustrations</NuxtLink>
              </div>
            </div>
            <div>
              <NuxtLink to="/services" class="text-2xl text-lime-400 font-bold mb-3 block">Services</NuxtLink>
              <div class="ml-4 flex flex-col gap-3">
                <NuxtLink to="/services/murals" class="text-xl text-gray-300 hover:text-lime-400">Murals</NuxtLink>
                <NuxtLink to="/services/framing" class="text-xl text-gray-300 hover:text-lime-400">Framing</NuxtLink>
                <NuxtLink to="/services/commissions" class="text-xl text-gray-300 hover:text-lime-400">Commissions</NuxtLink>
                <NuxtLink to="/services/classes" class="text-xl text-gray-300 hover:text-lime-400">Classes</NuxtLink>
              </div>
            </div>
            <NuxtLink to="/faqs" class="text-2xl text-gray-300 hover:text-lime-400">FAQs</NuxtLink>
            <NuxtLink to="/contact" class="text-2xl bg-lime-500 hover:bg-lime-400 text-zinc-950 font-bold py-4 px-6 rounded-lg text-center">Contact</NuxtLink>
          </nav>
        </div>
      </div>
    </Teleport>
  </nav>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false)
const route = useRoute()

// Close mobile menu when route changes
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>
