import {createSelector} from '@ngrx/store';
import {AppState} from '../app.state';
import {AuthState} from './auth.reducer';

export const authState = (state: AppState) => state.auth;
export const getUser = createSelector(
  authState,
  (state: AuthState) => state.user
);

export const getLoginStatus = createSelector(
  authState,
  (state: AuthState) => state.isLoggedIn
);

export const getMerchantRequest = createSelector(
  authState,
  (state: AuthState) => state.merchantRequest
);
