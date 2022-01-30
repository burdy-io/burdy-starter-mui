require('dotenv/config');
const fs = require('fs');
const {createRewrites} = require('@burdy-cms/web-utils');
const {createApi} = require('@burdy-cms/web-utils');

const burdyApi = createApi({
  xContentToken: process.env.BURDY_ACCESS_TOKEN,
  host: process.env.NEXT_PUBLIC_CMS_URL,
});

const pathRewrites = createRewrites({
  rewrite: [
    {
      source: 'sites/:lang(fr|de)',
      destination: '{lang}',
    },
    {
      source: 'sites/:lang(fr|de)/:path*',
      destination: '{lang}/{path}',
    },
    {
      source: 'sites/en/:path*',
      destination: '{path}',
    },
    {
      source: 'sites/en',
      destination: '',
    },
  ],
});

const createUrlLocation = ({url, lastMod = new Date(), priority = '1.0', changefreq = 'weekly'}) => `
    <url>
      <loc>${url}</loc>
      <lastmod>${lastMod.toISOString()}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>
`;
const createSitemap = async () => {
  const host = process.env.NEXT_PUBLIC_HOST;
  const sitemapStart = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  const sitemapEnd = `</urlset>`;
  const sitemapContent = [];

  const {results: pages} = await burdyApi.searchPages({
    parent: 'sites',
  });

  pages.forEach((page) => {
    const pagePath = pathRewrites.rewrite(page.slugPath);
    sitemapContent.push(
      createUrlLocation({
        url: `${host}/${pagePath}`,
        priority: pagePath === '' ? '1.0' : 1 - pagePath.split('/').length * 0.1,
        changefreq: 'daily',
      })
    );
  });

  return sitemapStart + sitemapContent.join('') + sitemapEnd;
};

createSitemap().then((sitemap) => fs.writeFileSync('public/sitemap.xml', sitemap));
