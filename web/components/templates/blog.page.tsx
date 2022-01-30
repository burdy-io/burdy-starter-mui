import { GetTemplateProps } from '../../types/burdy-cms';
import { Header, HeaderProps, Footer, FooterProps } from '@components/fragments';
import { Container, Typography } from '@mui/material';
import { burdyMapRewrites } from '@common/rewrites';
import React, { FC, ReactElement } from 'react';
import { RichTextBlock } from '@components/blocks';
import { IBurdyPage, usePreview } from '@burdy-cms/react-utils';
import { burdyApi } from '@common/burdy-api';
import { cleanObjectPropTypes } from '@utils/object.utils';

export type BlogsTemplateProps = {
  headerProps: HeaderProps;
  footerProps: FooterProps;
  page: IBurdyPage;
};

const BlogPage: FC<BlogsTemplateProps> = (props): ReactElement | null => {
  const page = usePreview(props.page);
  const { footerProps, headerProps } = cleanObjectPropTypes(props);

  const pageContent = cleanObjectPropTypes(page.meta.content);

  return (
    <>
      <Header
        logo={headerProps?.logo?.[0]}
        logoTitle="Burdy"
        logoLink={{ href: '/' }}
        links={headerProps?.links?.map?.((link) => link?.link || undefined)}
      />
      <Container
        maxWidth="md"
        sx={{
          pt: 3,
          pb: 3,
        }}
      >
        <Typography variant={'h1'} gutterBottom>
          {pageContent?.title}
        </Typography>
        <Typography variant={'subtitle2'} gutterBottom>
          {pageContent?.description}
        </Typography>
        <hr />
        <RichTextBlock content={pageContent?.content} />
      </Container>
      <Footer
        sections={footerProps?.sections || []}
        copyright={footerProps?.copyright || ''}
        copyrightLinks={footerProps?.copyrightLinks}
        maxWidth={footerProps?.maxWidth || 'lg'}
      />
    </>
  );
};

export const getTemplateProps: GetTemplateProps = async (page, path, options) => {
  const { header, footer } = burdyMapRewrites.rewrite(path);

  const [headerData, footerData] = await Promise.all([
    burdyApi.getPage(header as string, options),
    burdyApi.getPage(footer as string, options),
  ]);

  const headerProps = headerData.meta.content;
  const footerProps = footerData.meta.content;

  return {
    headerProps,
    footerProps,
  };
};

export default BlogPage;
