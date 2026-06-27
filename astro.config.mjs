import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // 公開時のドメインを設定
  site: 'https://yurieshiraishi.com',
  // base: '/clarinet-lessons/',
  compressHTML: true,
  integrations: [sitemap()],
});
