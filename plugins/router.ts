import { defineNuxtPlugin } from '#app';
import type { Router } from 'vue-router';
import { stripHTML } from '~/utils/html';

export default defineNuxtPlugin((nuxt) => {
  const router = nuxt.$router as Router;

  router.options.scrollBehavior = (
    to: import('vue-router').RouteLocationNormalized,
    from: import('vue-router').RouteLocationNormalized,
    savedPosition: { top?: number; left?: number } | null
  ) => {
    // Handle anchor links with smooth scrolling
    if (to.hash) {
      // Remove '#' from hash and try to find element, handle HTML content
      const elementId = stripHTML(to.hash.slice(1));
      const element = document.getElementById(elementId);

      // If element exists, scroll to it
      if (element) {
        return {
          el: `#${elementId}`,
          behavior: 'smooth',
          top: 80 // Offset for fixed header
        };
      }
      return { top: 0 };
    }

    // Default behavior
    return savedPosition || { top: 0 };
  };
});
