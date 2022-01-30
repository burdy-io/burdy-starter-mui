import React from 'react';
import clsx from 'clsx';
import { Button, Chip, Container, Typography } from '@mui/material';
import { Link, LinkProps } from '@components/core';
import { styled } from '@mui/material/styles';
import { cleanObject } from '@utils/object.utils';

const AnnouncementRootStyled = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  '&.primary': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
  '&.secondary': {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.secondary.contrastText,
  },
}));

export type AnnouncementSectionProps = {
  title?: string;
  caption?: string;
  appearance?: 'normal' | 'primary' | 'secondary';
  primaryAction?: LinkProps;
} & React.HTMLAttributes<HTMLDivElement>;

const AnnouncementBlock: React.FC<AnnouncementSectionProps> = (props) => {
  const { title = '', caption = '', primaryAction, appearance = 'normal', className, ...rest } = props;

  return (
    <AnnouncementRootStyled {...rest} className={clsx([className, appearance])}>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {caption && (
          <Chip
            sx={{
              mr: 2,
            }}
            color={'secondary'}
            label={caption}
          />
        )}
        {title?.length > 0 && (
          <Typography variant="body2">
            <Typography component="span" sx={{ mr: 8 }}>
              {title}
            </Typography>
          </Typography>
        )}
        {primaryAction && (
          <Button component={Link} variant={'contained'} color="secondary" size="small" sx={{ marginLeft: 'auto' }}>
            {primaryAction?.title}
          </Button>
        )}
      </Container>
    </AnnouncementRootStyled>
  );
};

export default AnnouncementBlock;
