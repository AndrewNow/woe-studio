import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro'
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [
    sanity({
      projectId: "n8fc5ydg",
      dataset: "production",
      // set useCDN to false if building statically
      useCDN: false,
    })
  ]
});
