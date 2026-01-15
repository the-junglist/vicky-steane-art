<!-- vbase 3 ts setup -->
<script setup lang="ts">
	import type { PropType } from 'vue'
	import type { H3Error } from 'h3'

	defineProps({
		error: {
			type: Object as PropType<H3Error>,
			required: true
		}
	});
</script>

<template>
	<section class="flex min-h-screen flex-col items-center justify-center">
		<h1 class="mb-2 text-9xl font-bold">
			{{ error?.statusCode }}
		</h1>
		<p class="mb-10 text-xl sm:text-3xl">
			{{ error?.statusMessage }}
		</p>
		<p class="pb-8">
			FUCK THIS!!!!!!!!!!!
		</p>
		<NuxtLink
			to="/"
			class="px-4 py-2 text-white bg-black rounded-md text-lg cursor-pointer"
		>
			Go home
		</NuxtLink>
	</section>
</template>