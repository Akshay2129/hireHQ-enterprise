import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginUser, UserLogin } from '../../../store';
import { AuthActions } from '../../../store/auth/auth.action';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isPasswordVisible: boolean = false;
  constructor(private router: Router, private store: Store,) {
    this.store.select(LoginUser).subscribe((state) => {
      if (state) {
        sessionStorage.setItem("user_id", state.user_id ?? '');
        sessionStorage.setItem("access_token", state.access_token ?? '');
        console.log('API Response: login****************', state.user_id ?? "Null");
        console.log("SessionStorage Updated: ", {
          user_id: sessionStorage.getItem("user_id"),
          access_token: sessionStorage.getItem("access_token"),
        });
        this.router.navigateByUrl('enterprise/jobs');
      }
    })
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  loginuser() {
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log('Form Values:', this.loginForm.value);
    const payload: UserLogin = {
      email: this.loginForm.value.email ?? '',
      type: "enterprise",
      password: this.loginForm.value.password ?? '',
    };
    this.store.dispatch(AuthActions.loginEnterprise({ payload }));
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onClickCreateAccout() {
    this.router.navigateByUrl('/auth/signup');
  }
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }





}
