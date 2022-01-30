import React from 'react';
import { Footer, Header, HeaderProps, FooterProps } from '@components/fragments';
import { BurdyPage, GetTemplateProps } from '../../types/burdy-cms';
import { burdyMapRewrites } from '@common/rewrites';
import { AnnouncementBlock } from '@components/blocks';
import { blocksMapper } from '@components/blocksMapper';
import { usePreview } from '@burdy-cms/react-utils';
import { cleanObjectPropTypes } from '@utils/object.utils';
import { burdyApi } from '@common/burdy-api';

export type LandingPageProps = {
  footerProps: FooterProps;
  headerProps: HeaderProps;
};

const LandingPage: BurdyPage<any, LandingPageProps> = (props) => {
  const page = usePreview(props.page);
  const { footerProps, headerProps } = cleanObjectPropTypes(props);
  const sections = (page?.meta?.content?.sections || []).map(cleanObjectPropTypes);

  return (
    <>
      {page?.meta?.content?.announcement && (
        <AnnouncementBlock {...cleanObjectPropTypes(page?.meta?.content?.announcement)} />
      )}
      <Header
        logo={headerProps?.logo?.[0]}
        logoTitle="Burdy"
        logoLink={{ href: '/' }}
        links={headerProps?.links?.map?.((link) => link?.link || undefined)}
      />
      {sections?.map?.(blocksMapper)}
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
  const { footer, header } = burdyMapRewrites.rewrite(path);
  const [footerFragment, headerFragment] = await Promise.all([
    burdyApi.getPage(footer as string, options),
    burdyApi.getPage(header as string, options),
  ]);

  return {
    footerProps: footerFragment?.meta?.content,
    headerProps: headerFragment?.meta?.content,
  };
};

export default LandingPage;
