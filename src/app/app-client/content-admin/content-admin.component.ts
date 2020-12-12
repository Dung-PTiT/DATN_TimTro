import {Component, NgZone, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {AppConfig} from "../../util/app-config";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../service/post.service";
import {MapsAPILoader} from "@agm/core";
import {AuthenticationService} from "../../service/authentication.service";
import {CommentService} from "../../service/comment.service";
import {
  faComments, faDollarSign,
  faEdit,
  faHeart,
  faHistory,
  faList,
  faMoneyCheckAlt
} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-content-admin',
  templateUrl: './content-admin.component.html',
  styleUrls: ['./content-admin.component.css']
})
export class ContentAdminComponent implements OnInit {

  user: User;

  PREFIX_URL = AppConfig.PREFIX_URL;
  CONTEXT_URL: string = "";
  DEFAULT_IMAGE: string = "./assets/images/avatar.png";

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private authenticationService: AuthenticationService,
              private commentService: CommentService) {
    this.PREFIX_URL = this.PREFIX_URL + this.CONTEXT_URL + "/image/get?imageUrl=";
  }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('userCurrent')) != null) {
      this.user = JSON.parse(localStorage.getItem('userCurrent'));
    } else {
      if (this.authenticationService.checkLogin()) {
        this.authenticationService.getCurrentUser().subscribe(resp => {
          this.user = resp.data;
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
  faUser = faUser;
  faDollarSign = faDollarSign;
}
