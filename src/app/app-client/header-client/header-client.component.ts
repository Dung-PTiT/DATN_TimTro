import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
  faComments, faHistory, faLaptopHouse, faListUl, faMoneyCheckAlt, faSignInAlt,
  faSignOutAlt, faUpload, faUserCircle, faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart
} from "@fortawesome/free-regular-svg-icons";
import {AuthenticationService} from "../../service/authentication.service";
import {CookieService} from "ngx-cookie-service";
import {AppConfig} from "../../util/app-config";
import {User} from "../../model/user";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {SuccessLogoutDialogComponent} from "./success-logout-dialog/success-logout-dialog.component";
import {PaypalService} from "../../service/paypal.service";

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.css']
})
export class HeaderClientComponent implements OnInit {

  userLogined : boolean = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private cookieService: CookieService,
              private http: HttpClient,
              private matDialog: MatDialog,
              private payPalService: PaypalService,
              private activatedRoute: ActivatedRoute) {
  }

  currentUser: User;
  nameBaseUser: string = 'Tài khoản';
  DEFAULT_IMAGE_USER = AppConfig.DEFAULT_IMAGE_USER;
  IMAGE_URL = AppConfig.IMAGE_URL;

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('userCurrent')) != null) {
      this.userLogined = true;
      this.currentUser = JSON.parse(localStorage.getItem('userCurrent'));
      if (this.currentUser.imageUrl == null) {
        this.currentUser.imageUrl = this.DEFAULT_IMAGE_USER;
      } else if ((this.currentUser?.imageUrl.indexOf("http") == -1)) {
        this.currentUser.imageUrl = this.IMAGE_URL + '/user/' + this.currentUser.id + '/' + this.currentUser.imageUrl;
      }
    } else {
      if (this.cookieService.get(AppConfig.COOKIE_TOKEN_NAME)) {
        this.userLogined = true;
        this.authenticationService.getCurrentUser().subscribe(resp => {
          this.currentUser = resp.data as User;
          if (this.currentUser.imageUrl == null) {
            this.currentUser.imageUrl = this.DEFAULT_IMAGE_USER;
          } else if ((this.currentUser?.imageUrl.indexOf("http") == -1)) {
            this.currentUser.imageUrl = this.IMAGE_URL + '/user/' + this.currentUser.id + '/' + this.currentUser.imageUrl;
          }
        });
      }
    }
  }

  logout() {
    this.cookieService.delete(AppConfig.COOKIE_TOKEN_NAME);
    this.cookieService.delete(AppConfig.COOKIE_ROLE_ACCOUNT);
    localStorage.removeItem('userCurrent');
    localStorage.removeItem('emailForgetAccount');

    const dialogRef = this.matDialog.open(SuccessLogoutDialogComponent, {
      width: 'auto',
      height: 'auto'
    });

  }

  faUpload = faUpload;
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;
  faUserCircle = faUserCircle;
  faListUl = faListUl;
  faSignOutAlt = faSignOutAlt;
  faComments = faComments;
  faMoneyCheckAlt = faMoneyCheckAlt;
  faHeart = faHeart;
  faHistory = faHistory;
  faLaptopHouse = faLaptopHouse;
}
