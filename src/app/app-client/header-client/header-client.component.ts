import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {
  faComments, faLaptopHouse, faListUl, faMoneyCheckAlt, faSignInAlt,
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

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.css']
})
export class HeaderClientComponent implements OnInit {

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private cookieService: CookieService,
              private http: HttpClient) {
  }

  currentUser: User;
  nameBaseUser: string = 'Tài khoản';
  userBaseUrl: string = './assets/images/user.jpg';

  USER_SESSION: string = "TimTro";

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('userCurrent')) != null) {
      this.currentUser = JSON.parse(localStorage.getItem('userCurrent'));
    } else {
      if (this.cookieService.get(AppConfig.COOKIE_TOKEN_NAME)) {
        this.authenticationService.getCurrentUser().subscribe(resp => {
          this.currentUser = resp.data as User;
        });
      }
    }
  }

  logout() {
    this.cookieService.delete(AppConfig.COOKIE_TOKEN_NAME);
    this.cookieService.delete(AppConfig.COOKIE_ROLE_ACCOUNT);
    localStorage.removeItem('userCurrent');
    localStorage.removeItem('emailForgetAccount');

    setTimeout(function () {
      location.replace('/');
    }, 1000);

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
  faLaptopHouse = faLaptopHouse;
}
