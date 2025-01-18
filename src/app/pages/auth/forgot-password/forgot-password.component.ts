import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { forgetPassword } from '../../../store/auth/auth.selectors';
import { AuthActions } from '../../../store/auth/auth.action';
import { SendResetEmail } from '../../../store';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  forgotForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private toaster: ToastrService,
    private router: Router,
  ) {
    this.forgotForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    });

    this.store.select(forgetPassword).subscribe((state) => {
      if (state) {
        console.log("API Response: ****************", state);
        const email = this.forgotForm.get("email")?.value;
        const action = 'FORGOT_PASSWORD';
        const queryString = `email=${encodeURIComponent(email)}&Action=${action}`;
        const encodedQueryString = btoa(queryString);
        this.router.navigate(['/auth/verify-email'], {
          queryParams: {
            data: encodedQueryString,
          },
        });
        
      }
    });
  }

  onResetEmail() {
    if (this.forgotForm.valid) {
      const payload: SendResetEmail = {
        email: this.forgotForm.get('email')?.value,
        action: "forget_password",
      };
      this.store.dispatch(AuthActions.forgetPassword({ payload }));
    }
  }
}
