// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const NOINDEX_CITY_SLUGS = [
  'سردخانه', 'میامی', 'کلاته-خیرآباد', 'دیهیم', 'امیریه',
  'رودبار', 'فولادمحله', 'لائلرود', 'بیارجمند', 'ژرژی',
];

// https://astro.build/config
export default defineConfig({
  site: 'https://semnan-service.ir',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'fa',
        locales: { fa: 'fa-IR' },
      },
      filter: (page) => {
        const decoded = decodeURIComponent(page);
        for (const slug of NOINDEX_CITY_SLUGS) {
          if (decoded.includes(`/خودروبر/${slug}/`)) return false;
          if (decoded.includes(`/ضایعات/عمده/${slug}/`)) return false;
          if (decoded.includes(`/${slug}/`) && decoded.includes('/تعمیرات/لوازم-خانگی/')) return false;
        }
        return true;
      },
    }),
  ],
  build: {
    format: 'directory',
  },
  prefetch: {
    prefetchAll: true,
  },
});
