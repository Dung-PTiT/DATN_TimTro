import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-paypal-dialog',
  templateUrl: './paypal-dialog.component.html',
  styleUrls: ['./paypal-dialog.component.css']
})
export class PaypalDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PaypalDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close("none");
  }
  faTimes = faTimes;
}
