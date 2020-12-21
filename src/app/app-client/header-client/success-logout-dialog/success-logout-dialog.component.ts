import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {faCheck, faHome, faSignInAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-success-logout-dialog',
  templateUrl: './success-logout-dialog.component.html',
  styleUrls: ['./success-logout-dialog.component.css']
})
export class SuccessLogoutDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SuccessLogoutDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  goToLogin() {
    this.dialogRef.close();
    location.replace('/login');
  }

  goToDashboard() {
    this.dialogRef.close();
    if (this.router.url == '/') {
      location.reload();
    } else {
      location.replace('/');
    }
  }

  faCheck = faCheck;
  faSignInAlt = faSignInAlt;
  faHome = faHome;
}
