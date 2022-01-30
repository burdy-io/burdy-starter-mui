import { BurdyPage, GetTemplateProps } from '../../types/burdy-cms';
import { Container, useTheme } from '@mui/material';
import { burdyMapRewrites } from '@common/rewrites';
import { Header, HeaderProps, Footer, FooterProps } from '@components/fragments';
import { blocksMapper } from '@components/blocksMapper';
import React from 'react';
import { usePreview } from '@burdy-cms/react-utils';
import { RichTextBlock } from '../blocks';
import { burdyApi } from '@common/burdy-api';
import { cleanObjectPropTypes } from '@utils/object.utils';

export type ComparisonTemplateProps = {
  headerProps: HeaderProps;
  footerProps: FooterProps;
};

const ComparisonPage: BurdyPage<ComparisonTemplateProps> = (props) => {
  const page = usePreview(props.page);
  const { headerProps, footerProps } = cleanObjectPropTypes(props);

  const pageContent = cleanObjectPropTypes(page.meta.content);
  const theme = useTheme();

  return (
    <>
      <Header
        logo={headerProps?.logo?.[0]}
        logoTitle="Burdy"
        logoLink={{ href: '/' }}
        links={headerProps?.links?.map?.((link) => (link as any)?.link || undefined)}
      />
      <Container maxWidth="lg" sx={{ marginBottom: theme.spacing(4) }}>
        <RichTextBlock content={pageContent?.content} />
        {blocksMapper({
          ...pageContent.comparisonTable,
          component_name: 'feature-table',
        })}
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
    burdyApi.getPage(header, options),
    burdyApi.getPage(footer, options),
  ]);

  const headerProps = headerData.meta.content;
  const footerProps = footerData.meta.content;

  return {
    headerProps,
    footerProps,
  };
};

export default ComparisonPage;
