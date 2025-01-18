import { createActionGroup, props } from "@ngrx/store";
import {  EnterpriseSingup,   NewPasswordResponse,   NewPasswordSet,   resendOtp,  resendOtpResponse,  SendResetEmail, sendResetEmailResponse, SingupResponse, UserLogin, userLoginResponse, VerifyOtp, VerifyOtpResponse } from "./auth.state";

export const AuthActions = createActionGroup({
  source: "Auth",
  events: {
    "Singup Enterprise": props<{ payload: EnterpriseSingup }>(),
    "Forget Password": props<{payload:SendResetEmail}>(),
    "Verify Otp": props<{ payload: VerifyOtp }>(),
    "resend Otp":props<{payload:resendOtp}>(),
    'Login Enterprise': props<{ payload: UserLogin }>(),
    'Set New Password': props<{ payload: NewPasswordSet }>(),

  },
});

export const AuthApiActions = createActionGroup({
  source: "AuthApi",
  events: {
    "singup Enterprise Success": props<{ response: SingupResponse }>(),
    "singup Enterprise Failure": props<{ error: SingupResponse}>(),
    "send Reset Email Success": props<{response: sendResetEmailResponse}>(),
    "send Reset Email Failure": props<{error: sendResetEmailResponse}>(),

    // "ForgetPassword Success": props<{ response: ForgetResponse }>(),
    // "ForgetPassword Failure": props<{ error: string }>(),
    "Verify Otp Success": props<{ response: VerifyOtpResponse }>(),
    "Verify Otp Failure": props<{ error: VerifyOtpResponse }>(),
    "resend Otp Success":props<{response:resendOtpResponse}>(),
    "resend Otp Failure":props<{error:resendOtpResponse}>(),
    'Login Enterprise Success': props<{ response: userLoginResponse }>(),
    'Login Enterprise Failure': props<{ error: userLoginResponse }>(),
    'Set password Success': props<{ response:  NewPasswordResponse }>(),
    'Set Password Failure': props<{ error: NewPasswordResponse }>(),
  },
});
