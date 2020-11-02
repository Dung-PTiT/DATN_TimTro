import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from "ngx-cookie-service";
import {AppConfig} from "../util/app-config";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url === AppConfig.PREFIX_URL + '/auth/login') return next.handle(request);
    if (this.cookieService.get(AppConfig.COOKIE_TOKEN_NAME)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.cookieService.get(AppConfig.COOKIE_TOKEN_NAME)}`
        }
      });
    }
    return next.handle(request);
  }

}
