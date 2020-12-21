import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Post} from "../../../../../model/post";
import {PostVipService} from "../../../../../service/post-vip.service";
import {PostVip} from "../../../../../model/postVip";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../../model/user";
import {Payment} from "../../../../../model/payment";
import {PaymentService} from "../../../../../service/payment.service";
import {ToastService} from "../../../../../service/toast.service";
import {AuthenticationService} from "../../../../../service/authentication.service";

@Component({
  selector: 'app-post-push-dialog',
  templateUrl: './post-push-dialog.component.html',
  styleUrls: ['./post-push-dialog.component.css']
})
export class PostPushDialogComponent implements OnInit {

  submitted = false;

  dayList: Array<any> = [];
  weekList: Array<any> = [];
  monthList: Array<any> = [];

  post: Post;
  user: User;
  postVips: PostVip[];
  typePost: string;
  timePost: number;
  startDate: Date;
  endDate: Date;
  pricePayment: number;

  pushPostForm: FormGroup;
  postVipCtrl: FormControl = new FormControl();
  packageTimePostCtrl: FormControl = new FormControl();
  timePostCtrl: FormControl = new FormControl();

  constructor(public dialogRef: MatDialogRef<PostPushDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private postVipService: PostVipService,
              private formBuilder: FormBuilder,
              private paymentService: PaymentService,
              private toastService: ToastService,
              private authenticationService: AuthenticationService) {

    this.pushPostForm = this.formBuilder.group({
      postVipSelect: new FormControl('', [Validators.required]),
      packageTimeSelect: new FormControl('', [Validators.required]),
      timePostSelect: new FormControl('', [Validators.required])
    });
    this.post = this.data.data;

    this.typePost = "day";
    this.dayList = Array.from({length: 100}, (v, k) => k + 1);
    this.weekList = Array.from({length: 10}, (v, k) => k + 1);
    this.monthList = Array.from({length: 6}, (v, k) => k + 1);

    this.pricePayment = 0;
    this.startDate = new Date();
    this.endDate = new Date();
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userCurrent'));

    this.postVipService.getAll().subscribe(resp => {
      this.postVips = resp.data;
    });
  }

  postVipChange() {
    let postVipType = this.pushPostForm.controls.postVipSelect.value as PostVip;
    let packageTimePost = this.pushPostForm.controls.packageTimeSelect.value;
    let number = this.pushPostForm.controls.timePostSelect.value;

    if (packageTimePost === 'day') {
      this.pricePayment = postVipType.dayPrice * number;
    } else if (packageTimePost === 'week') {
      this.pricePayment = postVipType.weekPrice * number;
    } else if (packageTimePost === 'month') {
      this.pricePayment = postVipType.monthPrice * number;
    }
  }

  packageTimeSelectChange() {
    this.typePost = this.pushPostForm.controls.packageTimeSelect.value;

    let postVipType = this.pushPostForm.controls.postVipSelect.value as PostVip;
    let packageTimePost = this.pushPostForm.controls.packageTimeSelect.value;
    let number = this.pushPostForm.controls.timePostSelect.value;

    if (packageTimePost === 'day') {
      this.pricePayment = postVipType.dayPrice * number;
      this.endDate.setDate(this.startDate.getDate() + number);
    } else if (packageTimePost === 'week') {
      this.pricePayment = postVipType.weekPrice * number;
      this.endDate.setDate(this.startDate.getDate() + number * 7);
    } else if (packageTimePost === 'month') {
      this.pricePayment = postVipType.monthPrice * number;
      this.endDate.setDate(this.startDate.getDate() + number * 30);
    }
  }

  timePostSelectChange() {
    this.timePost = this.pushPostForm.controls.timePostSelect.value;

    let postVipType = this.pushPostForm.controls.postVipSelect.value as PostVip;
    let packageTimePost = this.pushPostForm.controls.packageTimeSelect.value;
    let number = this.pushPostForm.controls.timePostSelect.value;

    if (packageTimePost === 'day') {
      this.pricePayment = postVipType.dayPrice * number;
      this.endDate.setDate(this.startDate.getDate() + number);
    } else if (packageTimePost === 'week') {
      this.pricePayment = postVipType.weekPrice * number;
      this.endDate.setDate(this.startDate.getDate() + number * 7);
    } else if (packageTimePost === 'month') {
      this.pricePayment = postVipType.monthPrice * number;
      this.endDate.setDate(this.startDate.getDate() + number * 30);
    }
  }

  pushPost() {
    this.submitted = true;

    if (this.pushPostForm.invalid) {
      return;
    }

    let payment = new Payment();
    payment.price = this.pricePayment;
    payment.startDate = this.startDate;
    payment.endDate = this.endDate;
    payment.description = this.pushPostForm.controls.packageTimeSelect.value;
    payment.status = true;

    let post = new Post();
    post.id = this.post.id;
    payment.post = post;

    payment.postVip = this.pushPostForm.controls.postVipSelect.value;

    this.paymentService.pushPost(payment).subscribe(resp => {
      if(resp.success == true){
        this.close();
        this.authenticationService.getCurrentUser().subscribe(resp => {
          localStorage.setItem('userCurrent', JSON.stringify(resp.data));
          location.reload();
          this.toastService.showSuccess(resp.data);
        });
      }else{
        this.close();
        this.toastService.showError("Đăng bài không thành công")
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  get validator() {
    return this.pushPostForm.controls;
  }
}

