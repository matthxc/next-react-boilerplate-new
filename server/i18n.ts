// #region Global Imports
import NextI18Next from 'next-i18next';
import * as config from 'next/config';
import path from 'path';
// #endregion Global Imports
const { localeSubpaths } = config.default().publicRuntimeConfig;

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['es'],
  localeSubpaths,
  localePath: path.resolve('./public/static/locales'),
});

export const { appWithTranslation, withTranslation } = NextI18NextInstance;

export default NextI18NextInstance;
