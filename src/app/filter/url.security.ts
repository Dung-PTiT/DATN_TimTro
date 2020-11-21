import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, of} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {AuthenticationService} from "../service/authentication.service";
import {AppConfig} from "../util/app-config";

@Injectable({providedIn: 'root'})
export class UrlSecurity implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let roleAccount = this.cookieService.get(AppConfig.COOKIE_ROLE_ACCOUNT);
    if (roleAccount) {
      if (route.data.roles && route.data.roles.indexOf(roleAccount) === -1) {
        this.router.navigate(['/login']);
        return of(false);
      }
      return of(true);
    }
    this.router.navigate(['/login']);
    return of(false);
  }

}
