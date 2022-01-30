import { createRewrites } from '@burdy-cms/web-utils';

export const burdyMapRewrites = createRewrites<{
  page: string,
  footer: string,
  header: string,
  docsMenu: string
}>({
  rewrite: [
    {
      source: '/:lang(fr|de)',
      destination: {
        page: 'sites/{lang}',
        footer: 'sites/{lang}/fragments/footer',
        header: 'sites/{lang}/fragments/header',
        docsMenu: 'sites/{lang}/fragments/docs-menu',
      },
    },
    {
      source: '/:lang(fr|de)/:path*',
      destination: {
        page: 'sites/{lang}/{path}',
        footer: 'sites/{lang}/fragments/footer',
        header: 'sites/{lang}/fragments/header',
        docsMenu: 'sites/{lang}/fragments/docs-menu',
      },
    },
    {
      source: '/',
      destination: {
        page: 'sites/en',
        footer: 'sites/en/fragments/footer',
        header: 'sites/en/fragments/header',
        docsMenu: 'sites/en/fragments/docs-menu',
      },
    },
    {
      source: '/:path*',
      destination: {
        page: 'sites/en/{path}',
        footer: 'sites/en/fragments/footer',
        header: 'sites/en/fragments/header',
        docsMenu: 'sites/en/fragments/docs-menu',
      },
    },
  ],
});


export const pathRewrites: any = createRewrites<string>({
  rewrite: [
    {
      source: 'sites/:lang(fr|de)',
      destination: '{lang}'
    },
    {
      source: 'sites/:lang(fr|de)/:path*',
      destination: '{lang}/{path}'
    },
    {
      source: 'sites/en/:path*',
      destination: '{path}'
    },
    {
      source: 'sites/en',
      destination: ''
    }
  ],
});
