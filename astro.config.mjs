import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // TODO: 公開時に実際のドメインに変更してください
  site: 'https://hagi-masa.github.io',
  // site: 'https://yurieshiraishi.com',
  base: '/clarinet-lessons/',
  compressHTML: true,
});
