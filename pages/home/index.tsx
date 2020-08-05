// #region Global Imports
import * as React from 'react';
import { NextPage } from 'next';
import { WithTranslation } from 'next-i18next';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MaterialLink from '@material-ui/core/Link';
import Link from 'next/link';
// #endregion Global Imports

// #region Local Imports
import { withTranslation } from '@Server/i18n';
import { wrapper } from '@Redux';
// #endregion Local Imports

export interface HomeProps extends WithTranslation {}

export interface HomeInitialProps {
  namespacesRequired: string[];
}

const Home: NextPage<HomeProps, HomeInitialProps> = ({ t }) => (
  <Container maxWidth="sm">
    <Box my={4}>
      <Typography variant="h1" component="h1" gutterBottom>
        {t('common:Hello')}
      </Typography>
      <Typography variant="h2" component="h1" gutterBottom>
        {t('common:World')}
      </Typography>
      <Link href="/example">
        <MaterialLink>Example</MaterialLink>
      </Link>
    </Box>
  </Container>
);

export const getStaticProps = wrapper.getStaticProps(async () => ({
  props: {
    namespacesRequired: ['common'],
  },
  revalidate: 60,
}));

const Extended = withTranslation('common')(Home) as NextPage<
  HomeProps,
  HomeInitialProps
>;

export default Extended;
