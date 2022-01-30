import { Footer, Header } from '@components/fragments';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { burdyMapRewrites } from '@common/rewrites';
import React from 'react';
import { ContentBlock } from '@components/blocks';
import { Box } from '@mui/material';
import { burdyApi } from '@common/burdy-api';
import { cleanObjectPropTypes } from '@utils/object.utils';

export default function Custom404(props) {
  const { headerProps, footerProps } = cleanObjectPropTypes(props);

  return (
    <>
      <Head>
        <title>404 Not Found | Burdy</title>
      </Head>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Header
          logo={headerProps?.logo?.[0]}
          logoTitle="Burdy"
          logoLink={{ href: '/' }}
          links={headerProps?.links?.map?.((link) => link?.link || undefined)}
        />
        <ContentBlock
          title="404 Not Found"
          primaryAction={{
            title: 'Go Home',
            href: '/',
          }}
        />
        <Footer
          sections={footerProps?.sections || []}
          copyright={footerProps?.copyright || ''}
          copyrightLinks={footerProps?.copyrightLinks}
          maxWidth={footerProps?.maxWidth || 'lg'}
        />
      </Box>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { header, footer } = burdyMapRewrites.rewrite('/');

  const [headerData, footerData] = await Promise.all([burdyApi.getPage(header), burdyApi.getPage(footer)]);

  const headerProps = headerData.meta.content;
  const footerProps = footerData.meta.content;

  return {
    props: {
      headerProps,
      footerProps,
    },
  };
};
