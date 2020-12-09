import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Post} from "../../../../../model/post";

@Component({
  selector: 'app-post-push-dialog',
  templateUrl: './post-push-dialog.component.html',
  styleUrls: ['./post-push-dialog.component.css']
})
export class PostPushDialogComponent implements OnInit {

  post: Post;

  constructor(public dialogRef: MatDialogRef<PostPushDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.post = this.data.data;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  // timespan(time: Date) {
  //   return moment(time).startOf("second").fromNow();
  // }
}
