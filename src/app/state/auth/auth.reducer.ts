import {createReducer, on, ActionReducer, INIT, UPDATE} from '@ngrx/store';
import {UserModel, UserUpdateResponse} from "../../service/user/user.model";
import {MerchantRequestModel} from "../../service/merchant-request/merchant-request.model";
import * as AuthActions from './auth.action';


export interface AuthState {
  user?: UserModel;
  isLoggedIn: boolean;
  merchantRequest?: MerchantRequestModel;
}

export const initialState: AuthState = {
  user: undefined,
  isLoggedIn: false,
  merchantRequest: undefined,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.persistUserDetails, (state, payload) => ({
    ...state,
    user: payload,
    isLoggedIn: true,
  })),
  on(AuthActions.clearUserDetails, () => ({
    user: undefined,
    isLoggedIn: false,
    merchantRequest: undefined,
  })),
  on(AuthActions.updateUserDetails, (state, payload) => ({
    ...state,
    user: converter(payload, state?.user)
  })),
  on(AuthActions.saveMerchantRequest, (state, payload) => ({
    ...state,
    merchantRequest: payload,
  }))
);

export const metaReducerLocalStorage = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return (state, action) => {
    if (action.type === INIT || action.type == UPDATE) {
      const storageValue = localStorage.getItem('state');
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem('state');
        }
      }
    }
    const nextState = reducer(state, action);
    localStorage.setItem('state', JSON.stringify(nextState));
    return nextState;
  };
};


const converter = (input: UserUpdateResponse, target?: UserModel): any => {
  if (target) {
    const targetCopy = {...target};
    targetCopy.address = input.address;
    targetCopy.phone = input.phone;
    targetCopy.role = input.role;
    targetCopy.pictureUrl = input.pictureUrl;
    target = targetCopy;
  }
  return target;
};
