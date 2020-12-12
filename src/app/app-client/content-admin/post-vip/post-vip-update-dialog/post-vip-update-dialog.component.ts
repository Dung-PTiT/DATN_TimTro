import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostVipService} from "../../../../service/post-vip.service";
import {PostVip} from "../../../../model/postVip";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-post-vip-update-dialog',
  templateUrl: './post-vip-update-dialog.component.html',
  styleUrls: ['./post-vip-update-dialog.component.css']
})
export class PostVipUpdateDialogComponent implements OnInit {

  submitted = false;
  postVipForm: FormGroup;
  postVip: PostVip;

  constructor(public dialogRef: MatDialogRef<PostVipUpdateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private postVipService: PostVipService) {
    this.postVipForm = this.formBuilder.group(
      {
        name: [data.name, Validators.required],
        description: [data.description, Validators.required],
        dayPrice: [data.dayPrice, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
        weekPrice: [data.weekPrice, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
        monthPrice: [data.monthPrice, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]]
      });
    this.postVip = data;
  }

  ngOnInit(): void {
  }

  updatePostVip() {
    this.submitted = true;

    if (this.postVipForm.invalid) {
      return;
    }

    this.postVip.name = this.postVipForm.controls.name.value;
    this.postVip.dayPrice = this.postVipForm.controls.dayPrice.value;
    this.postVip.weekPrice = this.postVipForm.controls.weekPrice.value;
    this.postVip.monthPrice = this.postVipForm.controls.monthPrice.value;
    this.postVip.description = this.postVipForm.controls.description.value;


    console.log(this.postVip);
    this.postVipService.update(this.postVip).subscribe(resp => {
      this.dialogRef.close(resp.success);
    });
  }

  get validator() {
    return this.postVipForm.controls;
  }

  close() {
    this.dialogRef.close("none");
  }

  faTimes = faTimes;
}
