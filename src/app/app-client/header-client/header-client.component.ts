import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {
  faComments,
  faListUl, faMoneyCheckAlt,
  faSignInAlt,
  faSignOutAlt,
  faUpload,
  faUserCircle,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import {AuthenticationService} from "../../service/authentication.service";
import {CookieService} from "ngx-cookie-service";
import {AppConfig} from "../../util/app-config";
import {UserPrincipal} from "../../model/UserPrincipal";

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.css']
})
export class HeaderClientComponent implements OnInit {

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private cookieService: CookieService) {
  }

  faUpload = faUpload;
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;
  faUserCircle = faUserCircle;
  faListUl = faListUl;
  faSignOutAlt = faSignOutAlt;
  faComments = faComments;
  faMoneyCheckAlt = faMoneyCheckAlt;
  currentUser: UserPrincipal;
  nameBaseUser: string = 'Tài khoản';
  userBaseUrl: string = './assets/images/user.jpg';

  ngOnInit(): void {
    if (this.cookieService.get(AppConfig.COOKIE_TOKEN_NAME)) {
      this.authenticationService.getCurrentUser().subscribe(resp => {
        this.currentUser = resp.data as UserPrincipal;
      }, error => {
      });
    }
  }

  logout() {
    this.authenticationService.logout().subscribe(resp => {
      this.cookieService.delete(AppConfig.COOKIE_TOKEN_NAME);
      location.href = "/";
    });
  }

  createPost() {

  }
}
