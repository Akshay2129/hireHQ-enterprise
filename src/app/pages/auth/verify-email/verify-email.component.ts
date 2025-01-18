import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../store/auth/auth.action';
import { resendOtp, verifyOtpDetails } from "../../../store"; // Assuming it's the selector for OTP verification details
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify-email',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  email: string = "";
  otp: string[] = new Array(6).fill("");
  otpArray = Array(6).fill(0);
  resendMessage: string | null = null;
  actionParam!: string;
  resendCooldown: boolean = false;
  resendTimer: number = 30; // 30 seconds timer
  resendInterval: any;

  constructor(private route: ActivatedRoute, private store: Store, private router: Router,
    
  ) {
    this.store.select(verifyOtpDetails).subscribe((state) => {
      if (state && this.actionParam === "FORGOT_PASSWORD") {
        sessionStorage.setItem("bearer_token", state.access_token ?? '');
        console.log('API Response: verify-email', state);
        this.router.navigateByUrl('/auth/set-password');
      } else if (state && !this.actionParam) {
        this.router.navigateByUrl('/auth/verification-successful');
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const encodedData = params['data'] || '';
      if (encodedData) {
        const decodedData = this.decodeBase64(encodedData);
        const parsedData = this.parseQueryString(decodedData);

        this.email = parsedData.email;
        this.actionParam = parsedData.action;

        console.log('Decoded Email:', this.email);
        console.log('Decoded Action:', this.actionParam);
      }
    });

    // this.startResendTimer();
  }

  private parseQueryString(decoded: string): { email: string, action: string } {
    const queryParams = new URLSearchParams(decoded);
    const email = queryParams.get('email') || '';
    const action = queryParams.get('Action') || '';
    return { email, action };
  }

  private decodeBase64(encoded: string): string {
    try {
      return atob(encoded);
    } catch (error) {
      console.error('Error decoding Base64 email:', error);
      return '';
    }
  }
  onPaste(event: ClipboardEvent): void {
    const pastedData = event.clipboardData?.getData('text') || '';
    if (/^\d{6}$/.test(pastedData)) {
      this.otp = pastedData.split('');
      this.otp.forEach((digit, i) => {
        const input = document.querySelector(`#otp-input-${i}`) as HTMLInputElement;
        if (input) input.value = digit;
      });
      (document.querySelector(`#otp-input-${this.otpArray.length - 1}`) as HTMLInputElement)?.focus();
      event.preventDefault();
    }
  }
  submitOtp(): void {
    if (this.isOtpComplete()) {
      const payload = {
        email: this.email,
        code: this.otp.join(""),
      };
      this.store.dispatch(AuthActions.verifyOtp({ payload }));
    } else {
      console.log("Incomplete OTP");
    }
  }

  isOtpComplete(): boolean {
    return this.otp.every((digit) => digit.trim() !== "");
  }

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    if (value && index < this.otp.length - 1) {
      this.focusNextInput(index);
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && !this.otp[index] && index > 0) {
      this.focusPreviousInput(index);
    }
  }

  focusNextInput(index: number): void {
    const nextInput = document.querySelectorAll<HTMLInputElement>('input[type="text"]')[index + 1];
    if (nextInput) {
      nextInput.focus();
    }
  }

  focusPreviousInput(index: number): void {
    const previousInput = document.querySelectorAll<HTMLInputElement>('input[type="text"]')[index - 1];
    if (previousInput) {
      previousInput.focus();
    }
  }

  resendOtp(): void {
    if (this.resendCooldown) return;

    const action = this.actionParam === "FORGOT_PASSWORD" ? "FORGOT_PASSWORD" : "USER_SIGNUP";
    const payload = {
      email: this.email,
      action: action,
    };
    console.log("Resending OTP...");

    this.store.dispatch(AuthActions.resendOtp({ payload }));

    this.resendCooldown = true;
    this.resendTimer = 30;
    this.resendInterval = setInterval(() => {
      this.resendTimer--;
      if (this.resendTimer <= 0) {
        clearInterval(this.resendInterval);
        this.resendCooldown = false;
      }
    }, 1000);

    setTimeout(() => {
    }, 2000);
  }

  // private startResendTimer(): void {
  //   this.resendCooldown = true;
  //   this.resendTimer = 30; // Reset the timer to 30 seconds

  //   this.resendInterval = setInterval(() => {
  //     this.resendTimer--;
  //     if (this.resendTimer <= 0) {
  //       clearInterval(this.resendInterval);
  //       this.resendCooldown = false;
  //     }
  //   }, 1000);
  // }
}
