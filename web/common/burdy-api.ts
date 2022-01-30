import { createApi } from '@burdy-cms/web-utils';

export const burdyApi = createApi({
  xContentToken: process.env.BURDY_ACCESS_TOKEN as string,
  host: process.env.NEXT_PUBLIC_CMS_URL as string,
});
