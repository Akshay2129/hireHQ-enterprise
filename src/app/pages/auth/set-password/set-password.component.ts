import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { newPassword, NewPasswordSet } from '../../../store';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthActions } from '../../../store/auth/auth.action';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-set-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss'
})
export class SetPasswordComponent {
  newPasswordForm: FormGroup;
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible:boolean=false;

  constructor(
    private store: Store,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialize reactive form
    this.newPasswordForm = this.fb.group({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmNewPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

    // Subscribe to the store to handle API response
    this.store.select(newPassword).subscribe((state) => {
      if (state) {
        console.log('API Response:', state);
        // Navigate to the next page or show success message
        this.router.navigate(['auth/new-password']);
      }
    });
  }

  // Method to create password
  createPassword() {
    if (this.newPasswordForm.valid) {
      const payload = {
        newPassword: this.newPasswordForm.get('password')?.value,
        confirmNewPassword: this.newPasswordForm.get('confirmNewPassword')?.value,
      };

      // Dispatch the action to call the API
      this.store.dispatch(AuthActions.setNewPassword({ payload }));
    } else {
      console.log('Form is invalid');
    }
  }
  passwordSucess() {
    debugger
    this.router.navigateByUrl('auth/new-password')
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  confirmPasswordVisible(): void {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }
}