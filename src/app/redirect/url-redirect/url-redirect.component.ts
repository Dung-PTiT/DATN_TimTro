import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {AppConfig} from "../../util/app-config";
import * as moment from 'moment';

@Component({
  selector: 'app-url-redirect',
  templateUrl: './url-redirect.component.html',
  styleUrls: ['./url-redirect.component.css']
})
export class UrlRedirectComponent implements OnInit {

  constructor(protected readonly route: ActivatedRoute,
              protected readonly router: Router,
              private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['token'] != null) {
        this.cookieService.set(AppConfig.COOKIE_TOKEN_NAME, params['token'], moment(new Date()).add(AppConfig.COOKIE_TOKEN_EXPIRE_TIME, 's').toDate(), "/");
        location.href = "/";
      }
    })
  }

}
