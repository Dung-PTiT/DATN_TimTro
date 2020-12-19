import {Component, OnInit} from '@angular/core';
import {faCloudUploadAlt, faTrash, faUpload, faUserEdit} from "@fortawesome/free-solid-svg-icons";
import {User} from "../../../../model/user";
import {AppConfig} from "../../../../util/app-config";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../service/authentication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../../../service/toast.service";
import {UserService} from "../../../../service/user.service";
import {MatDialog} from "@angular/material/dialog";
import {UserUpdateDialogComponent} from "./user-update-dialog/user-update-dialog.component";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  passwordForm: FormGroup;
  submitted = false;

  user: User;

  IMAGE_URL = AppConfig.IMAGE_URL;
  DEFAULT_IMAGE_USER = AppConfig.DEFAULT_IMAGE_USER;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private toastService: ToastService,
              private userService: UserService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {

    this.passwordForm = this.formBuilder.group(
      {
        inputNewPass: ['', Validators.required],
        inputNewPassConfirm: ['', Validators.required]
      },
      {
        validator: MustMatch('inputNewPass', 'inputNewPassConfirm')
      });

    if (JSON.parse(localStorage.getItem('userCurrent')) != null) {
      this.user = JSON.parse(localStorage.getItem('userCurrent'));
      if (this.user.imageUrl == null) {
        this.user.imageUrl = this.DEFAULT_IMAGE_USER;
      } else if ((this.user?.imageUrl.indexOf("http") == -1)) {
        this.user.imageUrl = this.IMAGE_URL + '/user/' + this.user.id + '/' + this.user.imageUrl;
      }
    } else {
      if (this.authenticationService.checkLogin()) {
        this.authenticationService.getCurrentUser().subscribe(resp => {
          this.user = resp.data;
          if (this.user.imageUrl == null) {
            this.user.imageUrl = this.DEFAULT_IMAGE_USER;
          } else if ((this.user?.imageUrl.indexOf("http") == -1)) {
            this.user.imageUrl = this.IMAGE_URL + '/user/' + this.user.id + '/' + this.user.imageUrl;
          }
        });
      }
    }
  }


  changePassword() {
    this.submitted = true;
    if (this.passwordForm.invalid) {
      return;
    }
    this.userService
      .changePassword(this.user?.id, this.passwordForm.controls.inputNewPass.value)
      .subscribe(resp => {
        if (resp.success) {
          this.toastService.showSuccess("Đổi mật khẩu thành công");
        } else {
          this.toastService.showError("Không đổi được mật khẩu");
        }
      });
  }

  get validator() {
    return this.passwordForm.controls;
  }

  openUpdateUserDialog(user: any) {
    const dialogRef = this.matDialog.open(UserUpdateDialogComponent, {
      width: '800px',
      height: 'auto',
      data: user,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp.success == true) {
        this.authenticationService.getCurrentUser().subscribe(resp => {
          this.user = resp.data;
          localStorage.setItem('userCurrent', JSON.stringify(resp.data));
          if (this.user.imageUrl == null) {
            this.user.imageUrl = this.DEFAULT_IMAGE_USER;
            location.replace("/manage/user");
          } else if ((this.user?.imageUrl.indexOf("http") == -1)) {
            this.user.imageUrl = this.IMAGE_URL + '/user/' + this.user.id + '/' + this.user.imageUrl;
            location.replace("/manage/user");
          }
        });
        this.toastService.showSuccess(resp.data);
      } else if (resp.success == "none") {
      }
    });
  }

  faUpload = faUpload;
  faCloudUploadAlt = faCloudUploadAlt;
  faTrash = faTrash;
  faUserEdit = faUserEdit;
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
