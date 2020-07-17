// #region Global Imports
import * as React from 'react';
import App from 'next/app';
import { ThemeProvider } from 'styled-components';
// #endregion Global Imports

// #region Local Imports
import { theme } from '@Definitions/Styled';
import { appWithTranslation } from '@Server/i18n';
import { wrapper } from '@Redux';

import '@Static/css/main.scss';
// #endregion Local Imports

class WrappedApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

export default wrapper.withRedux(appWithTranslation(WrappedApp));
