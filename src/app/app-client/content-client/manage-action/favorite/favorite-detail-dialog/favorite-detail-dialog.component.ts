import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Post} from "../../../../../model/post";

@Component({
  selector: 'app-favorite-detail-dialog',
  templateUrl: './favorite-detail-dialog.component.html',
  styleUrls: ['./favorite-detail-dialog.component.css']
})
export class FavoriteDetailDialogComponent implements OnInit {

  post: Post;

  constructor(public dialogRef: MatDialogRef<FavoriteDetailDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.post = this.data.data;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
