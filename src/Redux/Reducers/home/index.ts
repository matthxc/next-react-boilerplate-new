import { HYDRATE } from 'next-redux-wrapper';
// #region Local Imports
import { ActionConsts } from '@Definitions';
// #endregion Local Imports

// #region Interface Imports
import { IAction, IHomePage } from '@Interfaces';
// #endregion Interface Imports

const INITIAL_STATE: IHomePage.IStateProps = {
  home: {
    version: 1,
  },
  image: {
    url: '',
  },
};

type IMapPayload = IHomePage.Actions.IMapPayload;

export const HomeReducer = (
  state = INITIAL_STATE,
  action: IAction<IMapPayload>,
) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...(action.payload as any).home };
    case ActionConsts.Home.SetReducer:
      return {
        ...state,
        ...action.payload,
      };

    case ActionConsts.Home.ResetReducer:
      return INITIAL_STATE;

    default:
      return state;
  }
};
