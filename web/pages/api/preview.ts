const expiry = process.env.PREVIEW_EXPIRY || '15'; // The preview mode cookies expire in 15 minutes
const PREVIEW_EXPIRY = parseInt(expiry, 10);

export default async function preview(req, res) {
  if (
    (process.env.NODE_ENV === 'production' && req.query.secret !== process.env.BURDY_PREVIEW_SECRET) ||
    !req.query.slugPath
  ) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.setPreviewData(
    {
      token: process.env.BURDY_ACCESS_TOKEN,
      draft: true,
    },
    {
      maxAge: PREVIEW_EXPIRY,
    }
  );

  res.redirect(req?.query?.slugPath);
}
