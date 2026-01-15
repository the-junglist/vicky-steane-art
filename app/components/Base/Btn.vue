<script setup lang="ts">
	defineProps({
		label: {
			type: String,
			default: ''
		},
		to: {
			type: String,
			default: ''
		},
		btnRoundness: { // new prop
			type: String,
			default: ''
		}
	});
</script>

<template>
	<NuxtLink
		:to="to"
		:class="['ps-6', 'pe-8', 'py-4', 'text-white', 'bg-orange-400', 'text-base', 'lg:text-lg', 'cursor-pointer', btnRoundness]"
	>
		<slot>
			<Icon name="mdi:fire" style="color: #ffffff"/>
			{{ label }}
		</slot>
	</NuxtLink>
</template>