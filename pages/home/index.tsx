// #region Global Imports
import * as React from 'react';
import { NextPage } from 'next';
import { useSelector, useDispatch } from 'react-redux';
import { PlanetaryService } from '@Services';
import { ActionConsts } from '@Definitions';
// #endregion Global Imports

// #region Local Imports
import { withTranslation } from '@Server/i18n';
import {
  Container,
  Top,
  TopText,
  Middle,
  MiddleLeft,
  MiddleLeftButtons,
  MiddleRight,
  Apod,
  ApodButton,
} from '@Styled/Home';
import { IStore } from '@Redux/IStore';
import { HomeActions } from '@Actions';
import { Heading, LocaleButton } from '@Components';
import { wrapper } from '@Redux';
// #endregion Local Imports

// #region Interface Imports
import { IHomePage } from '@Interfaces';
// #endregion Interface Imports

const Home: NextPage<IHomePage.IProps, IHomePage.InitialProps> = ({
  t,
  i18n,
}) => {
  const home = useSelector((state: IStore) => state.home);
  const dispatch = useDispatch();

  const renderLocaleButtons = (activeLanguage: string) =>
    ['en', 'es', 'tr'].map((lang) => (
      <LocaleButton
        key={lang}
        lang={lang}
        isActive={activeLanguage === lang}
        onClick={() => i18n.changeLanguage(lang)}
      />
    ));

  return (
    <Container>
      <Top>
        <img src="/images/pankod-logo.png" alt="Pankod Logo" />
      </Top>
      <Middle>
        <MiddleLeft>
          <MiddleLeftButtons>
            {renderLocaleButtons(i18n.language)}
          </MiddleLeftButtons>
        </MiddleLeft>
        <MiddleRight>
          <TopText>{t('common:Hello')}</TopText>
          <Heading text={t('common:World')} />
          <Apod>
            <ApodButton
              onClick={() => {
                dispatch(
                  HomeActions.GetApod({
                    params: { hd: false },
                  }),
                );
              }}
            >
              Discover Space
            </ApodButton>
            <img
              src={home.image.url}
              height="300"
              width="150"
              alt="Discover Space"
            />
          </Apod>
        </MiddleRight>
      </Middle>
    </Container>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  async ({ store: { dispatch } }) => {
    const result = await PlanetaryService.GetPlanetImage({
      params: { hd: false } as any,
    });

    dispatch({
      payload: {
        image: result,
      },
      type: ActionConsts.Home.SetReducer,
    });

    return {
      props: {
        namespacesRequired: ['common'],
      },
      unstable_revalidate: 60,
    };
  },
);

const Extended = withTranslation('common')(Home) as NextPage<
  IHomePage.IProps,
  IHomePage.InitialProps
>;

export default Extended;
