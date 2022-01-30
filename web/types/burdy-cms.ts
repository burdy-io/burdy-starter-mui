import { GetStaticPropsResult } from 'next';
import React from 'react';
import { GetPageOptions, IBurdyTag } from '@burdy-cms/web-utils';
import { IBurdyPage } from '@burdy-cms/react-utils';

export interface IBurdyImage {
  id?: number;
  name?: string;
  height?: number;
  width?: number;
  mimeType?: string;
  tags?: IBurdyTag[];
  src?: string;
  alt?: string;
}

export type IBurdyBlog = IBurdyPage<{
  title: string;
  description: string;
  featured: [IBurdyImage];
  content: any;
  seo: {
    title: string;
    description: string;
    featured: [IBurdyImage];
  };
}>;

export type GetTemplateProps<
  G extends { [key: string]: any } = { [key: string]: any },
  P extends { [key: string]: any } = { [key: string]: any }
> = (page: IBurdyPage<G>, path: string, options?: GetPageOptions) => Promise<P> | P;

export type BurdyPage<
  T extends { [key: string]: any } = { [key: string]: any },
  P extends { [key: string]: any } = { [key: string]: any }
> = React.VoidFunctionComponent<
  {
    page: IBurdyPage<P>;
  } & T
>;
