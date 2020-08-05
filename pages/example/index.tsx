// #region Global Imports
import * as React from 'react';
import { NextPage } from 'next';
import { WithTranslation } from 'next-i18next';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
// #endregion Global Imports

// #region Local Imports
import { withTranslation } from '@Server/i18n';
import { wrapper } from '@Redux';
// #endregion Local Imports

export interface ExampleProps extends WithTranslation {}

export interface ExampleInitialProps {
  namespacesRequired: string[];
}

const Example: NextPage<ExampleProps, ExampleInitialProps> = () => (
  <Container maxWidth="sm">
    <Box my={4}>
      <Typography variant="h1" component="h1" gutterBottom>
        Example page
      </Typography>
      <Button variant="contained" color="primary">
        Example
      </Button>
    </Box>
  </Container>
);

export const getStaticProps = wrapper.getStaticProps(async () => ({
  props: {
    namespacesRequired: ['common'],
  },
  revalidate: 60,
}));

const Extended = withTranslation('common')(Example) as NextPage<
  ExampleProps,
  ExampleInitialProps
>;

export default Extended;
