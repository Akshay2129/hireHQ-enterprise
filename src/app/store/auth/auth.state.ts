export interface EnterpriseSingup {
  user: {
    establishment_name: string;
    email: string;
    domain_name: string;
    fullname: string;
    designation: string;
    type: string;
    password: string;
    auth_id_reference: string;
  };
}

export interface AuthState {
  verifyed: boolean;
  loginDetails: SingupResponse['response']['user'] | null;
  error: string | null;
  success: string | null;
  verifyOtp: VerifyOtpResponse['response'] | null;
  newPassword: NewPasswordResponse['response'] | null;
  resendOtpResponse: resendOtpResponse['response'] | null;
  loginUserDetails: userLoginResponse['response'] | null;
  forgetPassword: sendResetEmailResponse['response'] | null;
}

export interface VerifyOtp {
  email: string;
  code: string;
}
export interface resendOtp {
  email: string;
  action: string
}

export interface VerifyOtpResponse {
  message: string;
  response: {
    access_token: string;
    expires_in: number | null;
    refresh_token: string;
    refresh_expires_in: number | null;
    token_type: string | null;
    not_before_policy: string | null;
    scope: string | null;
  }
}
export interface SingupResponse {
  message: string;
  response: {
    user: {
      id: string;
      userId: string;
      createdBy: string;
      updatedBy: string;
      createdOn: string;
      updatedOn: string;
      enterpriseId: string;
      fullname: string;
      email: string;
      is_enabled: boolean;
      is_all_hierarchy_associate: boolean;
      is_all_work_location_associate: boolean;
      is_all_cost_center_associate: boolean;
      is_all_spend_category_associate: boolean;
      is_allow_unlimited_authority: boolean;
    };
  };
}
export interface userLoginResponse {
  message: string;
  response: {
    access_token: string;
    expires_in: number | null;
    refresh_token: string;
    refresh_expires_in: number | null;
    token_type: string | null;
    not_before_policy: string | null;
    scope: string | null;
    user_id: string | null;
  }
}
export interface sendResetEmailResponse {
  message: string;
  response: {
    email: string;
    is_all_hierarchy_associate: boolean;
    is_all_work_location_associate: boolean;
    is_all_cost_center_associate: boolean;
    is_all_spend_category_associate: boolean;
    is_allow_unlimited_authority: boolean;
  }
}
export interface SendResetEmail {
  email: string;
  action: string | null;
}

export interface resendOtpResponse {
  message: string | null;
  response: {
    code: string | null;
    createdAt: number | null;
    expiresAt: number | null;
  };
}

export interface UserLogin {
  email: string | null;
  type: string | null;
  password: string | null;
}

export interface NewPasswordResponse {
  meassage: string,
  response: {
    email: string,
    is_all_hierarchy_associate: boolean,
    is_all_work_location_associate: boolean,
    is_all_cost_center_associate: boolean,
    is_all_spend_category_associate: boolean,
    is_allow_unlimited_authority: boolean,
    password: string
  };
}
export interface NewPasswordSet {
  newPassword: string;
  confirmNewPassword: string;
}
