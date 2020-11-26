import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-app-client',
  templateUrl: './app-client.component.html',
  styleUrls: ['./app-client.component.css']
})
export class AppClientComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.authenticationService.checkLogin();
  }

}
