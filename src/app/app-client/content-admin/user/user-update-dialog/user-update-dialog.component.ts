import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../model/user";
import {AppConfig} from "../../../../util/app-config";
import {faCloudUploadAlt, faTimes, faTrash, faUpload} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {ToastService} from "../../../../service/toast.service";
import {UserService} from "../../../../service/user.service";

@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
  styleUrls: ['./user-update-dialog.component.css']
})
export class UserUpdateDialogComponent implements OnInit {

  updateUserForm: FormGroup;
  submitted = false;
  role: string;

  user: User;
  roleCtrl: FormControl = new FormControl();
  statusCtrl: FormControl = new FormControl();

  PREFIX_URL = AppConfig.PREFIX_URL;
  CONTEXT_URL: string = "";
  DEFAULT_IMAGE: string = "./assets/images/avatar.png";

  constructor(public dialogRef: MatDialogRef<UserUpdateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User,
              private router: Router,
              private formBuilder: FormBuilder,
              private toastService: ToastService,
              private userService: UserService) {
    this.user = data;
  }

  ngOnInit(): void {
    this.updateUserForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      phoneNumber: [this.user.phoneNumber, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]]
    });

    this.roleCtrl.setValue(this.user.role);
    if (this.user.isActived) {
      this.statusCtrl.setValue("true");
    } else {
      this.statusCtrl.setValue("false");
    }
  }

  get validator() {
    return this.updateUserForm.controls;
  }

  // image
  url: any;
  image: File;

  onSelectFile(event) {
    if (event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    this.image = event.target.files[0];
  }

  saveUserUpdate() {
    this.submitted = true;

    if (this.updateUserForm.invalid) {
      return;
    }

    let formData = new FormData();
    formData.append("id", this.user.id.toString());
    formData.append("name", this.updateUserForm.controls.name.value);
    formData.append("phoneNumber", this.updateUserForm.controls.phoneNumber.value);
    formData.append("role", this.roleCtrl.value);
    formData.append("isActived", this.statusCtrl.value);
    if (this.image != null) {
      formData.append("file", this.image);
    }

    this.userService.updateUser(formData).subscribe(resp => {
      if (resp.success) {
        this.dialogRef.close(resp);
      } else {
        this.toastService.showError(resp.data);
      }
    });
  }

  removeImages() {
    this.url = null;
    this.image = null;
  }

  close() {
    this.dialogRef.close("none");
  }

  faUpload = faUpload;
  faCloudUploadAlt = faCloudUploadAlt;
  faTrash = faTrash;
  faTimes = faTimes;
}
