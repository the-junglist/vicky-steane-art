<template>
	<div>
		<!-- Skip to content link for accessibility -->
		<a href="#main-content" class="skip-to-content">
			Skip to main content
		</a>
		
		<NuxtLayout>
			<main id="main-content" tabindex="-1">
				<NuxtPage />
			</main>
		</NuxtLayout>
	</div>
</template>

<style>
/* Skip to content link - hidden until focused */
.skip-to-content {
	position: absolute;
	top: -40px;
	left: 0;
	background: #a3e635; /* lime-400 */
	color: #000;
	padding: 8px 16px;
	z-index: 9999;
	text-decoration: none;
	font-weight: 600;
	border-radius: 0 0 4px 0;
}

.skip-to-content:focus {
	top: 0;
}

/* Screen reader only class */
.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}
</style>
