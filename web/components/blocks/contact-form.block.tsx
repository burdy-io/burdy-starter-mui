import React, { FC } from 'react';
import { Container, Typography } from '@mui/material';
import dynamic from 'next/dynamic';

export type ContactFormBlockProps = {
  title?: string;
};

const HubspotForm = dynamic(() => import('@components/core/hubspot-form'), {
  ssr: false,
});

const ContactFormBlock: FC<ContactFormBlockProps> = (props) => {
  const { title } = props;

  return (
    <Container>
      {(title as string)?.length > 0 && (
        <Typography gutterBottom variant="h2" component={'h2'} dangerouslySetInnerHTML={{ __html: title as string }} />
      )}
      <HubspotForm />
    </Container>
  );
};

export default ContactFormBlock;
