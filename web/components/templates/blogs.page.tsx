import { BurdyPage, GetTemplateProps } from '../../types/burdy-cms';
import { Footer, Header, FooterProps, HeaderProps } from '@components/fragments';
import { burdyMapRewrites, pathRewrites } from '@common/rewrites';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { Link, MediaCard } from '@components/core';
import React from 'react';
import { usePreview, IBurdyPage } from '@burdy-cms/react-utils';
import { burdyApi } from '@common/burdy-api';
import { cleanObjectPropTypes } from '@utils/object.utils';

export type BlogsTemplateProps = {
  blogs: IBurdyPage<any>[];
  headerProps: HeaderProps;
  footerProps: FooterProps;
};

const BlogsPage: BurdyPage<BlogsTemplateProps> = (props) => {
  const page = usePreview(props?.page);
  const { blogs, footerProps, headerProps } = cleanObjectPropTypes(props);

  const theme = useTheme();

  return (
    <>
      <Header
        logo={headerProps?.logo?.[0]}
        logoTitle="Burdy"
        logoLink={{ href: '/' }}
        links={headerProps?.links?.map?.((link) => link?.link || undefined)}
      />
      <Container
        sx={{
          pt: 4,
          pb: 4,
        }}
      >
        <Typography variant={'h1'} gutterBottom>
          {page?.meta?.content?.title || 'Blogs'}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gap: theme.spacing(3),
            gridTemplateColumns: 'repeat(3, 1fr)',
            [theme.breakpoints.down('md')]: {
              gridTemplateColumns: 'repeat(2, 1fr)',
            },
            [theme.breakpoints.down('sm')]: {
              gridTemplateColumns: '1fr',
            },
          }}
        >
          {blogs.map((blog) => {
            const blogContent = blog.meta.content;
            const slugPath = pathRewrites.rewrite(blog?.slugPath);

            return (
              <Link key={blog.id} href={`/${slugPath}`} sx={{ textDecoration: 'none !important' }}>
                <MediaCard
                  title={blogContent?.title}
                  description={blogContent?.description}
                  image={blogContent?.featured?.[0]}
                  avatar={{
                    firstName: 'Team',
                    lastName: 'Burdy',
                  }}
                  createdAt={new Date(blog.createdAt)}
                />
              </Link>
            );
          })}
        </Box>
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
  const { page: pagePath, header, footer } = burdyMapRewrites.rewrite(path) || {};

  const [headerData, footerData, pageData] = await Promise.all([
    burdyApi.getPage(header as string, options),
    burdyApi.getPage(footer as string, options),
    burdyApi.searchPages({
      parent: pagePath as string,
      orderBy: 'post.createdAt',
      order: 'DESC',
      compile: true,
    }),
  ]);

  const headerProps = headerData.meta.content;
  const footerProps = footerData.meta.content;

  return {
    headerProps,
    footerProps,
    blogs: pageData?.results,
  };
};

export default BlogsPage;
