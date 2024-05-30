import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: "n8fc5ydg",
      dataset: "production",
      // set useCDN to false if building statically
      useCDN: false
    })
  ]
});
