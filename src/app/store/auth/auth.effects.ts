import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../service/auth.service";
import { inject } from "@angular/core";
import { catchError, map, mergeMap, of } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { AuthActions, AuthApiActions } from "./auth.action";

export const SingupUser$ = createEffect(
  (
    actions$ = inject(Actions),
    httpAuthService = inject(AuthService),
    toastr = inject(ToastrService)
  ) =>
    actions$.pipe(
      ofType(AuthActions.singupEnterprise),
      mergeMap(({ payload }) =>
        httpAuthService.singupEnterprise(payload).pipe(
          map((response) => {
            const successMessage = response.message || 'Signup successful!';
            toastr.success(successMessage);
            return AuthApiActions.singupEnterpriseSuccess({
              response: {
                ...response,
                message: successMessage,
              },
            });
          }),
          catchError((error) => {
            const errorMessage =
              error.error?.message || 'An unexpected error occurred.';
            toastr.error(errorMessage);
            return of(
              AuthApiActions.singupEnterpriseFailure({
                error: {
                  message: errorMessage,
                  response: { user: {} as any },
                },
              })
            );
          })
        )
      )
    ),
  { functional: true }
);

export const VerifyOtp$ = createEffect(
  (
    actions$ = inject(Actions),
    httpAuthService = inject(AuthService),
    toastr = inject(ToastrService)
  ) =>
    actions$.pipe(
      ofType(AuthActions.verifyOtp),
      mergeMap(({ payload }) =>
        httpAuthService.verifyOtp(payload).pipe(
          map((response) => {
            const successMessage = response.message || 'OTP verified successfully!';
            toastr.success(successMessage);
            return AuthApiActions.verifyOtpSuccess({
              response: {
                ...response,
                message: successMessage,
              },
            });
          }),
          catchError((error) => {
            const errorMessage = error.message || 'OTP verification failed. Please try again'
            toastr.error(errorMessage);
            return of(AuthApiActions.verifyOtpFailure({
              error: {
                message: errorMessage,
                response: {} as any,

              }

            }));
          })
        )
      )
    ),
  { functional: true }
);
export const ForgetPassword$ = createEffect(
  (
    actions$ = inject(Actions),
    httpAuthService = inject(AuthService),
    toastr = inject(ToastrService)
  ) =>
    actions$.pipe(
      ofType(AuthActions.forgetPassword),
      mergeMap(({ payload }) =>
        httpAuthService.forgetPassword(payload).pipe(
          map((response) => {
            const successMessage = response.message || 'OTP send successfully'
            toastr.success(successMessage);
            return AuthApiActions.sendResetEmailSuccess({
              response: {
                ...response,
                message: successMessage,
              },

            });
          }),
          catchError((error) => {
            const errorMessage = error.error?.message || 'An unexpected error occurred.'
            toastr.error(errorMessage);
            return of(AuthApiActions.sendResetEmailFailure({
              error: {
                message: errorMessage,
                response: {} as any,
              }

            }));
          })
        )
      )
    ),
  { functional: true }
);

export const ResendOtp$ = createEffect(
  (
    actions$ = inject(Actions),
    httpAuthService = inject(AuthService),
    toastr = inject(ToastrService)
  ) =>
    actions$.pipe(
      ofType(AuthActions.resendOtp),
      mergeMap(({ payload }) =>
        httpAuthService.resentOtp(payload).pipe(
          map((response) => {
            const successMessage = response.message || 'Resend OTP successfully!';
            toastr.success(successMessage);
            return AuthApiActions.resendOtpSuccess({
              response: {
                ...response,
                message: successMessage
              }
            });
          }),
          catchError((error) => {
            const errorMessage = error.message || 'An unexpected error occurred.'
            toastr.error(errorMessage);
            return of(AuthApiActions.resendOtpFailure({
              error: {
                message: errorMessage,
                response: {} as any,
              }
            }));
          })
        )
      )
    ),
  { functional: true }
);

export const loginUser$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const httpHandlerService = inject(AuthService);
    const toastr = inject(ToastrService);
    return actions$.pipe(
      ofType(AuthActions.loginEnterprise),
      mergeMap(({ payload }) =>
        httpHandlerService.loginUser(payload).pipe(
          map((response) => {
            const successMessage = response.message || "Login successful!";
            toastr.success(successMessage);
            return AuthApiActions.loginEnterpriseSuccess({
              response: {
                ...response,
                message: successMessage,
              },
            });
          }),
          catchError((error) => {
            const errorMessage =
              error.error?.message || "Login failed! Please try again.";
            toastr.error(errorMessage);
            return of(
              AuthApiActions.loginEnterpriseFailure({
                error: {
                  message: errorMessage,
                  response: {} as any,
                },
              })
            );
          })
        )
      )
    );
  },
  { functional: true }
);


export const newPassword$ = createEffect(
  (
    actions$ = inject(Actions),
    httpAuthService = inject(AuthService),
    toastr = inject(ToastrService)
  ) =>
    actions$.pipe(
      ofType(AuthActions.setNewPassword),
      mergeMap(({ payload }) =>
        httpAuthService.setNewPassword(payload).pipe(
          map((response) => {
            const successMessage = response.message || "Password changed successfully!";
            toastr.success(successMessage);
            return AuthApiActions.setPasswordSuccess({
              response: {
                ...response,
                message: successMessage
              }

            });
          }),
          catchError((error) => {
            const errorMessage = error.message || 'Password changed failed';
            toastr.error(errorMessage);
            return of(AuthApiActions.setPasswordFailure({
              error: {
                meassage: errorMessage,
                response: {} as any
              }
            }));
          })
        )
      )
    ),
  { functional: true }
);