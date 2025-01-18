import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { ToastrService } from "ngx-toastr";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { loginDetails } from "../../../store/auth/auth.selectors";
import { AuthActions } from "../../../store/auth/auth.action";
import { EnterpriseSingup } from "../../../store";

@Component({
  selector: "app-signup",
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent {
  loginForm!: FormGroup;
  submitted = false;
  constructor(
    private store: Store,
    private toaster: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      establishment_name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      domain_name: ["", Validators.required],
      sameDomain: [false],
      fullname: ["", Validators.required],
      designation: ["", Validators.required],
      type: ["enterprise", Validators.required],
      password: ["", [Validators.required, Validators.minLength(8)]],
      auth_id_reference: ["123456", Validators.required],
    });

   
    
    this.store.select(loginDetails).subscribe((state) => {
      if (state) {
        const encodedEmail = btoa(this.loginForm.get("email")?.value);
        this.router.navigate(["/auth/verify-email"], {
          queryParams: { email: encodedEmail },
        });
      }
    });

   
  }
  get f() {
    return this.loginForm.controls;
  }
 
  get establishment_name(){
    return this.loginForm.get("establishment_name")
  }
  get email(){
    return this.loginForm.get("email")
  }
  get domain_name(){
    return this.loginForm.get("domain_name")
  }
  get password(){
    return this.loginForm.get("password")
  }
   get fullname(){
    return this.loginForm.get("fullname")
  }
  get designation(){
    return this.loginForm.get("designation")
  }
  onClickLogin() {
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const payload: EnterpriseSingup = {
      user: {
        establishment_name: this.loginForm.get("establishment_name")?.value,
        email: this.loginForm.get("email")?.value,
        domain_name: this.loginForm.get("domain_name")?.value,
        fullname: this.loginForm.get("fullname")?.value,
        designation: this.loginForm.get("designation")?.value,
        type: this.loginForm.get("type")?.value,
        password: this.loginForm.get("password")?.value,
        auth_id_reference: this.loginForm.get("auth_id_reference")?.value,
      },
    };

    this.store.dispatch(AuthActions.singupEnterprise({ payload }));
  }

  isPasswordVisible: boolean = false;

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onCheckboxChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      const email = this.loginForm.get("email")?.value;
      if (email && email.includes("@")) {
        const domain = email.split("@")[1].split(".")[0];
        this.loginForm.patchValue({ domain_name: domain });
      }
    } else {
      this.loginForm.patchValue({ domain_name: "" });
    }
  }

  onDomainInputChange(): void {
    this.loginForm.patchValue({ sameDomain: false });
  }

  signin() {
    this.router.navigate(["/auth/signin"]);
  }
}
