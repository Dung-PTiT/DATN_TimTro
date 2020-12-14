import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";
import {CookieService} from "ngx-cookie-service";
import {ToastService} from "../service/toast.service";
import {CategoryCreateDialogComponent} from "../app-client/content-admin/category/category-create-dialog/category-create-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {EmailVerifyRedirectDialogComponent} from "./email-verify-redirect-dialog/email-verify-redirect-dialog.component";

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.css']
})
export class EmailVerifyComponent implements OnInit {

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
    this.emailVerifyForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
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

    this.authenticationService.verifyEmail(this.emailVerifyForm.controls.email.value,
      this.emailVerifyForm.controls.code.value).subscribe(resp => {
      if (resp.success == true) {
        const dialogRef = this.matDialog.open(EmailVerifyRedirectDialogComponent, {
          width: 'auto',
          height: 'auto'
        });
      } else {
        this.toastService.showWarning(resp.data);
      }
    });
  }
}
