import React from 'react';
import TopBar from '@/layouts/top-bar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

interface Props {
  children: React.ReactNode;
}

const Main = ({ children }: Props): JSX.Element => {

  return (
    <>
      <TopBar />

      <Box
        paddingY={4}
        paddingX={4}
      >
        {children}
      </Box>
    </>
  );
};

export default Main;
