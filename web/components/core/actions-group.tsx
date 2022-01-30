import React, { FC } from 'react';
import { styled } from '@mui/material/styles';

const ActionsRootStyled = styled('div')(({ theme }) => ({
  display: 'inline-grid',
  gridAutoFlow: 'column',
  gridGap: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    gridAutoFlow: 'row',
    gridAutoColumns: '1fr',
  },
}));

export type ActionsGroupProps = React.HTMLAttributes<HTMLDivElement>;

const ActionsGroup: FC<ActionsGroupProps> = (props) => {
  const { children, ...rest } = props;
  return <ActionsRootStyled {...rest}>{children}</ActionsRootStyled>;
};

export default ActionsGroup;
