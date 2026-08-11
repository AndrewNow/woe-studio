import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro'
import netlify from '@astrojs/netlify'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify({
    imageCDN: false,
  }),
  image: {
    domains: ['cdn.sanity.io', 'astro.build']
  },
  integrations: [
    react(),
    sanity({
      projectId: "n8fc5ydg",
      dataset: "production",
      useCDN: true, // set useCDN to false if building statically
    })
  ]
});
