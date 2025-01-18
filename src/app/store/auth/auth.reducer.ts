import { createReducer, on } from "@ngrx/store";
import { AuthState, VerifyOtpResponse } from "./auth.state";
import { AuthApiActions } from "./auth.action";

export const initialAuthState: AuthState = {
  loginDetails: null,
  verifyed: false,
  error: null,
  success: null,
  forgetPassword: null,
  verifyOtp: null,
  resendOtpResponse: null,
  loginUserDetails: null,
  newPassword: null,

};



export const authReducer = createReducer(
  initialAuthState,

  on(AuthApiActions.singupEnterpriseSuccess, (state, { response }) => ({
    ...state,
    loginDetails: { ...response.response.user },
    verifyed: true,
    error: null,
    success: response.message
  })),

  on(AuthApiActions.singupEnterpriseFailure, (state, { error }) => ({
    ...state,
    verifyed: false,
    error: error.message,
  })),

  on(AuthApiActions.sendResetEmailSuccess, (state, { response }) => ({
    ...state,
    verifyed: false,
    response,
    forgetPassword: { ...response.response },
    error: null,
    success: response.message
  })),
  on(AuthApiActions.sendResetEmailFailure, (state, { error }) => ({
    ...state,
    verifyed: false,
    error: error.message,
  })),
  on(AuthApiActions.verifyOtpSuccess, (state, { response }) => ({
    ...state,
    verifyOtp: { ...response.response },
    error: null,
    success: response.message
  })),

  on(AuthApiActions.verifyOtpFailure, (state, { error }) => ({
    ...state,
    error: error.message
  })),

  on(AuthApiActions.resendOtpSuccess, (state, { response }) => ({
    ...state,
    resendOtpResponse: { ...response.response },
    error: null,
    success: response.message

  })),
  on(AuthApiActions.resendOtpFailure, (state, { error }) => ({
    ...state,
    error: error.message,

  })),
  on(AuthApiActions.loginEnterpriseSuccess, (_state, { response }) => ({
    ..._state,
    loginUserDetails: { ...response.response },
    error: null,
    success: response.message
  })),
  on(AuthApiActions.loginEnterpriseFailure, (state, { error }) => ({
    ...state,
    error: error.message,
  })),
  on(AuthApiActions.setPasswordSuccess, (_state, { response }) => ({
    ..._state,
    newPassword: { ...response.response },
    error: null,
    success: response.meassage
  })),
  on(AuthApiActions.setPasswordFailure, (state, { error }) => ({
    ...state,
    error:error.meassage,
  
  })),
);
