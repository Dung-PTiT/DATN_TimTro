import {Injectable, NgZone} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {AppConfig} from "../util/app-config";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import * as moment from "../login/login.component";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  PREFIX_URL = AppConfig.PREFIX_URL;
  CONTEXT_URL: string;

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              // public afAuth: AngularFireAuth,
              public router: Router,
              public ngZone: NgZone) {
    this.CONTEXT_URL = "/auth";
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.PREFIX_URL + this.CONTEXT_URL + '/login', {username: username, password: password});
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(this.PREFIX_URL + this.CONTEXT_URL + '/get-current-user');
  }

  logout(): Observable<any> {
    return this.http.get(this.PREFIX_URL + this.CONTEXT_URL + '/logout');
  }

  isLogin() {
    if (this.cookieService.get(AppConfig.COOKIE_TOKEN_NAME)) {
      if (this.cookieService.get(AppConfig.COOKIE_ROLE_ACCOUNT)) {
        return true;
      } else {
        this.getCurrentUser().subscribe(resp => {
          this.cookieService.set(AppConfig.COOKIE_ROLE_ACCOUNT, resp.data.role.substring(5))
        });
        return true;
      }
    }
    return false;
  }
}
