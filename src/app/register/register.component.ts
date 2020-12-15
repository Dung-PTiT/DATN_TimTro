import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";
import {CookieService} from "ngx-cookie-service";
import {ToastService} from "../service/toast.service";
import {AppConfig} from "../util/app-config";
import {faHandPointRight} from "@fortawesome/free-regular-svg-icons";
import {faArrowCircleLeft} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              public router: Router,
              private authenticationService: AuthenticationService,
              private cookieService: CookieService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        name: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
        email: ['', [Validators.required, Validators.email]],
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  get validator() {
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.authenticationService.register(this.registerForm.controls.username.value, this.registerForm.controls.password.value,
      this.registerForm.controls.name.value, this.registerForm.controls.phoneNumber.value, this.registerForm.controls.email.value)
      .subscribe(
        resp => {
          if (resp.success) {
            this.toastService.showSuccess("Đã tạo tài khoản. Hãy xác thực");
            this.router.navigate(['/email-verify']);
          } else {
            this.toastService.showWarning("Tài khoản đã tồn tại");
          }
        }
      );
  }

  oauthGoogle() {
    location.href = AppConfig.GOOGLE_AUTH_URL;
  }

  oauthFacebook() {
    location.href = AppConfig.FACEBOOK_AUTH_URL;
  }

  verifyEmail(){
    this.router.navigate(['/email-verify']);
  }

  faHandPointRight = faHandPointRight;
  faArrowCircleLeft = faArrowCircleLeft;
}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({mustMatch: true});
    } else {
      matchingControl.setErrors(null);
    }
  }
}
