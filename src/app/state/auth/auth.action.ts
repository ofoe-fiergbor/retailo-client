import {createAction, props} from '@ngrx/store';
import {UserModel, UserUpdateResponse} from "../../service/user/user.model";
import {MerchantRequestModel} from "../../service/merchant-request/merchant-request.model";


export const persistUserDetails = createAction(
  '[Auth Page] Persist User',
  props<UserModel>()
)

export const clearUserDetails = createAction('[Auth Page] Clear User Details');

export const updateUserDetails = createAction(
  '[Profile Page] Update User',
  props<UserUpdateResponse>()
);


export const saveMerchantRequest = createAction(
  '[Profile Page] Merchant Request',
  props<MerchantRequestModel>()
);
