<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="(image, index) in images"
      :key="index"
      class="group relative aspect-square bg-zinc-800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-lime-400 transition-all"
      @click="$emit('image-click', index)"
    >
      <NuxtImg
        v-if="image"
        :src="image"
        :alt="`Gallery image ${index + 1}`"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
        format="webp"
        quality="80"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <Icon name="mdi:image" class="text-6xl text-zinc-600" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  images: string[]
}>()

defineEmits<{
  'image-click': [index: number]
}>()
</script>
