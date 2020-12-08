import * as React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export const HomePage = () => (
  <Container>
    <Typography align="center" variant="h1">
      Home page
    </Typography>
    <Button variant="contained" color="primary">
      Hello world
    </Button>
  </Container>
);

export default HomePage;
