<template>
  <div class="min-h-screen bg-zinc-950">
    <div class="container mx-auto px-4 py-16 max-w-2xl">
      <h1 class="text-5xl font-bold text-lime-400 mb-8">Contact</h1>

      <div class="bg-zinc-900 rounded-lg p-8 mb-8">
        <h2 class="text-2xl text-lime-400 mb-6">Get In Touch</h2>
        
        <div class="space-y-6">
          <div class="flex items-start gap-4">
            <Icon name="mdi:email" class="text-3xl text-lime-400 mt-1" />
            <div>
              <h3 class="text-xl font-bold text-gray-200 mb-1">Email</h3>
              <a href="mailto:info@vickysteane.co.uk" class="text-lime-400 hover:text-lime-300">
                info@vickysteane.co.uk
              </a>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <Icon name="mdi:phone" class="text-3xl text-lime-400 mt-1" />
            <div>
              <h3 class="text-xl font-bold text-gray-200 mb-1">Phone</h3>
              <a href="tel:+441174639993" class="text-lime-400 hover:text-lime-300">
                +44 117 463 9993
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-zinc-900 rounded-lg p-8">
        <h2 class="text-2xl text-lime-400 mb-6">Send a Message</h2>
        <p class="text-gray-400 mb-6">
          Interested in commissions, framing services, or art classes? Drop me a message and I'll get back to you soon.
        </p>
        <form class="space-y-6">
          <div>
            <label class="block text-gray-300 mb-2">Name</label>
            <input
              type="text"
              class="w-full bg-zinc-800 text-gray-200 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-400"
              placeholder="Your name"
            />
          </div>

          <div>
            <label class="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              class="w-full bg-zinc-800 text-gray-200 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-400"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label class="block text-gray-300 mb-2">Message</label>
            <textarea
              rows="6"
              class="w-full bg-zinc-800 text-gray-200 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-400"
              placeholder="Tell me about your project..."
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full bg-lime-500 hover:bg-lime-400 text-zinc-950 font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Contact Vicky Steane - Art Commissions & Enquiries',
  meta: [
    { name: 'description', content: 'Get in touch for art commissions, bespoke framing, mural work, or art classes. Based in London and South West England.' }
  ]
})
</script>
