import {Component, OnInit} from '@angular/core';
import {faComments, faEdit, faHeart, faHistory, faList, faMoneyCheckAlt} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../service/authentication.service";
import {User} from "../../../model/user";
import {AppConfig} from "../../../util/app-config";

@Component({
  selector: 'app-manage-action',
  templateUrl: './manage-action.component.html',
  styleUrls: ['./manage-action.component.css']
})
export class ManageActionComponent implements OnInit {

  user: User;

  IMAGE_URL = AppConfig.IMAGE_URL;
  DEFAULT_IMAGE_USER = AppConfig.DEFAULT_IMAGE_USER;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('userCurrent')) != null) {
      this.user = JSON.parse(localStorage.getItem('userCurrent'));
      if (this.user.imageUrl == null) {
        this.user.imageUrl = this.DEFAULT_IMAGE_USER;
      } else if ((this.user?.imageUrl.indexOf("http") == -1)) {
        this.user.imageUrl = this.IMAGE_URL + '/user/' + this.user.id + '/' + this.user.imageUrl;
      }
    } else {
      if (this.authenticationService.checkLogin()) {
        this.authenticationService.getCurrentUser().subscribe(resp => {
          this.user = resp.data;
          if (this.user.imageUrl == null) {
            this.user.imageUrl = this.DEFAULT_IMAGE_USER;
          } else if ((this.user?.imageUrl.indexOf("http") == -1)) {
            this.user.imageUrl = this.IMAGE_URL + '/user/' + this.user.id + '/' + this.user.imageUrl;
          }
        });
      }
    }
  }

  faEdit = faEdit;
  faHeart = faHeart;
  faComments = faComments;
  faList = faList;
  faMoneyCheckAlt = faMoneyCheckAlt;
  faHistory = faHistory;

}
