import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { burdyMapRewrites, pathRewrites } from '@common/rewrites';
import { Templates } from '@components/templateMapper';
import { burdyApi } from '@common/burdy-api';
import { IBurdyPage } from '@burdy-cms/react-utils';

export type WebsiteProps = {
  page: IBurdyPage<any>;
  [key: string]: any;
};

const Website: NextPage<WebsiteProps> = (props) => {
  const contentTypeName = props?.page?.contentType?.name;
  const Template = Templates?.[contentTypeName as string].default;
  return (
    <>
      <Template {...props} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const { results: pages } = await burdyApi.searchPages({
    parent: 'sites',
  });

  return {
    paths: (pages || []).map((page) => {
      const pagePath = pathRewrites.rewrite(page.slugPath);
      return {
        params: {
          slug: pagePath?.split('/'),
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const path = `/${((context?.params?.slug as string[]) || []).join('/')}`;
    const previewData: any = context.previewData;
    const { page: pagePath } = burdyMapRewrites.rewrite(path);

    const options: any = {
      draft: !!previewData,
    };

    let page;
    try {
      page = await burdyApi.getPage(pagePath as string, options);
    } catch (err) {
      return {
        notFound: true,
      };
    }

    const contentTypeName = page?.contentType?.name;
    const template = Templates?.[contentTypeName];

    if (!template)
      return {
        notFound: true,
      };

    const additionalProps = (await template?.getTemplateProps?.(page, path, options)) || {};

    return {
      props: {
        page,
        ...(additionalProps || {}),
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default Website;
