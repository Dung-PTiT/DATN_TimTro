import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../../service/authentication.service";
import {CookieService} from "ngx-cookie-service";
import {ToastService} from "../../../../service/toast.service";
import {faHandPointRight} from "@fortawesome/free-regular-svg-icons";
import {faArrowCircleLeft, faTimes} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-user-create-dialog',
  templateUrl: './user-create-dialog.component.html',
  styleUrls: ['./user-create-dialog.component.css']
})
export class UserCreateDialogComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  role: string;

  roleCtrl: FormControl = new FormControl();

  constructor(public dialogRef: MatDialogRef<UserCreateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
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

    this.roleCtrl.setValue("ROLE_MEMBER");
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
      this.registerForm.controls.name.value, this.registerForm.controls.phoneNumber.value, this.registerForm.controls.email.value, this.roleCtrl.value)
      .subscribe(
        resp => {
          if (resp.success) {
            this.dialogRef.close(resp);
          } else {
            this.toastService.showError(resp.data);
          }
        }
      );
  }

  closeDialog() {
    this.dialogRef.close("none");
  }

  faHandPointRight = faHandPointRight;
  faArrowCircleLeft = faArrowCircleLeft;
  faTimes = faTimes;
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
