import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AuthenticationService} from "../../service/authentication.service";
import {CookieService} from "ngx-cookie-service";
import {ToastService} from "../../service/toast.service";
import {faArrowCircleLeft} from "@fortawesome/free-solid-svg-icons";
import {SuccessGetForgetAccountDialogComponent} from "./success-get-forget-account-dialog/success-get-forget-account-dialog.component";

@Component({
  selector: 'app-forget-account-with-email',
  templateUrl: './forget-account-with-email.component.html',
  styleUrls: ['./forget-account-with-email.component.css']
})
export class ForgetAccountWithEmailComponent implements OnInit {

  email: string;
  emailVerifyForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              public router: Router,
              private matDialog: MatDialog,
              private authenticationService: AuthenticationService,
              private cookieService: CookieService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {

    this.email = localStorage.getItem('emailForgetAccount');

    this.emailVerifyForm = this.formBuilder.group({
      email: [this.email, [Validators.required, Validators.email]],
      code: ['', Validators.required],
    });
  }

  get validator() {
    return this.emailVerifyForm.controls;
  }

  verifyEmail() {
    this.submitted = true;

    if (this.emailVerifyForm.invalid) {
      return;
    }

    this.authenticationService.getForgetAccount(this.emailVerifyForm.controls.email.value,
      this.emailVerifyForm.controls.code.value).subscribe(resp => {
      if (resp.success) {
        const dialogRef = this.matDialog.open(SuccessGetForgetAccountDialogComponent, {
          width: 'auto',
          height: 'auto'
        });
      } else {
        this.toastService.showError(resp.data);
      }
    });
  }

  faArrowCircleLeft = faArrowCircleLeft;
}
