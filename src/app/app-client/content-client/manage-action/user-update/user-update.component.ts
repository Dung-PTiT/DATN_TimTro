import {Component, NgZone, OnInit} from '@angular/core';
import {faCloudUploadAlt, faTrash, faUpload} from "@fortawesome/free-solid-svg-icons";
import {User} from "../../../../model/user";
import {AppConfig} from "../../../../util/app-config";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../../../service/post.service";
import {MapsAPILoader} from "@agm/core";
import {AuthenticationService} from "../../../../service/authentication.service";
import {CommentService} from "../../../../service/comment.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../../../service/toast.service";
import {UserService} from "../../../../service/user.service";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  passwordForm: FormGroup;
  submitted = false;

  user: User;

  PREFIX_URL = AppConfig.PREFIX_URL;
  CONTEXT_URL: string = "";
  DEFAULT_IMAGE: string = "./assets/images/avatar.png";

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private authenticationService: AuthenticationService,
              private commentService: CommentService,
              private formBuilder: FormBuilder,
              private toastService: ToastService,
              private userService: UserService) {
    this.PREFIX_URL = this.PREFIX_URL + this.CONTEXT_URL + "/image/get?imageUrl=";
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
    } else {
      if (this.authenticationService.checkLogin()) {
        this.authenticationService.getCurrentUser().subscribe(resp => {
          this.user = resp.data;
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

  // image
  url: any;
  image: File;

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.url = event.target.result;
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
    this.image = event.target.files[0];
  }

  saveUserImage() {

  }

  removeImages() {
    this.url = null;
  }

  faUpload = faUpload;
  faCloudUploadAlt = faCloudUploadAlt;
  faTrash = faTrash;
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
