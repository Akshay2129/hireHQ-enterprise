import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnterpriseSingup, NewPasswordSet, resendOtp, SendResetEmail, UserLogin, VerifyOtp } from '../store';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  loginUser(userCread: UserLogin): Observable<any> {
    return this.http.post(`${environment.AUTH_URL}/user/login`, userCread);
  }
  singupEnterprise(payload: EnterpriseSingup): Observable<any> {
    return this.http.post(`${environment.AUTH_URL}/user/signup`, payload)
  }
  forgetPassword(payload: SendResetEmail): Observable<any> {
    return this.http.post(`${environment.AUTH_URL}/user/forgot-password`, payload)
  }

  verifyOtp(payload: VerifyOtp): Observable<any> {
    return this.http.post(`${environment.AUTH_URL}/user/verify-otp`, payload)
  }
  resentOtp(payload: resendOtp): Observable<any> {
    return this.http.post(`${environment.AUTH_URL}/user/otp`, payload)
  }
  setNewPassword(payload: NewPasswordSet): Observable<any> {
    // Get the token (assuming it's stored in localStorage or any storage mechanism)
    const token = sessionStorage.getItem('bearer_token'); // Replace with your token retrieval logic
    console.log(`token:********************* ${token}`)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${environment.AUTH_URL}/user/reset-password`, payload, { headers });
  }



}
