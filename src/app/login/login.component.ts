import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../service/authentication.service";
import {CookieService} from "ngx-cookie-service";
import {OAuthResponseToken} from "../model/OAuthResponseToken";
import {AppConfig} from "../util/app-config";
import * as moment from 'moment';
import {ToastService} from "../service/toast.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  oAuthResponseToken: OAuthResponseToken;

  constructor(private formBuilder: FormBuilder,
              public router: Router,
              private authenticationService: AuthenticationService,
              private cookieService: CookieService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      inputUsername: ['', Validators.required],
      inputPassword: ['', Validators.required],
    });
  }

  get validator() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.loginForm.controls.inputUsername.value, this.loginForm.controls.inputPassword.value).subscribe(resp => {
      if (resp.success) {
        this.oAuthResponseToken = resp.data as OAuthResponseToken;
        if (this.oAuthResponseToken != null) {
          this.cookieService.set(AppConfig.COOKIE_TOKEN_NAME, this.oAuthResponseToken.token,
            moment(new Date()).add(this.oAuthResponseToken.expireTime, 'ms').toDate());
          location.href = "/";
        }
      }else{
        this.toastService.showError("Tên đăng nhập hoặc mật khẩu không đúng");
      }
    });
  }

  oauthGoogle() {
    location.href = AppConfig.GOOGLE_AUTH_URL;
  }

  oauthFacebook() {
    location.href = AppConfig.FACEBOOK_AUTH_URL;
  }
}
