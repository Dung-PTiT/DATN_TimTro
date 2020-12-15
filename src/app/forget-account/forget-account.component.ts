import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";
import {CookieService} from "ngx-cookie-service";
import {ToastService} from "../service/toast.service";
import {MatDialog} from "@angular/material/dialog";
import {faArrowCircleLeft} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-forget-account',
  templateUrl: './forget-account.component.html',
  styleUrls: ['./forget-account.component.css']
})
export class ForgetAccountComponent implements OnInit {

  forgetPasswordForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              public router: Router,
              private matDialog: MatDialog,
              private authenticationService: AuthenticationService,
              private cookieService: CookieService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get validator() {
    return this.forgetPasswordForm.controls;
  }

  verifyEmail() {
    this.submitted = true;

    if (this.forgetPasswordForm.invalid) {
      return;
    }

    localStorage.setItem('emailForgetAccount', this.forgetPasswordForm.controls.email.value);

    this.authenticationService.genCodeEmailVerify(this.forgetPasswordForm.controls.email.value).subscribe(resp => {
      if (resp.success == true) {
        this.toastService.showSuccess(resp.data);
        this.router.navigate(["/forget-account-with-email"]);
      } else {
        this.toastService.showError(resp.data);
      }
    });

  }

  faArrowCircleLeft = faArrowCircleLeft;
}
