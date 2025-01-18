import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState,  } from "./auth.state";

export const selectAuthState = createFeatureSelector<AuthState>("auth");


export const loginDetails = createSelector(
  selectAuthState,
  (state) => state.loginDetails
);
export const forgetPassword = createSelector(
  selectAuthState,
  (state) => state.forgetPassword
);

export const verifyOtpDetails = createSelector(
  selectAuthState,
  (state) => state.verifyOtp
)

export const resendOtpDetails = createSelector(
  selectAuthState,
  (state) => state.resendOtpResponse
)
export const LoginUser = createSelector(selectAuthState,
  (state) => state.loginUserDetails
);

export const newPassword = createSelector(selectAuthState,
  (state) => state.newPassword
);
   

