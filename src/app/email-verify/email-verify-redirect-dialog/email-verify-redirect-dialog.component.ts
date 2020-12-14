import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {faCheck, faHome, faSignInAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-email-verify-redirect-dialog',
  templateUrl: './email-verify-redirect-dialog.component.html',
  styleUrls: ['./email-verify-redirect-dialog.component.css']
})
export class EmailVerifyRedirectDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EmailVerifyRedirectDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  goToLogin() {
    this.dialogRef.close();
    this.router.navigate(['/login']);
  }

  goToDashboard() {
    this.dialogRef.close();
    this.router.navigate(['/']);
  }

  faCheck = faCheck;
  faSignInAlt = faSignInAlt;
  faHome = faHome;
}
