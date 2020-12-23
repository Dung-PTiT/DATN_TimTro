import { Component, OnInit } from '@angular/core';
import {User} from "../../../../model/user";
import {Post} from "../../../../model/post";
import {AppConfig} from "../../../../util/app-config";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PostService} from "../../../../service/post.service";
import {UserService} from "../../../../service/user.service";
import {AuthenticationService} from "../../../../service/authentication.service";
import {
  faComments,
  faEllipsisV,
  faEnvelope,
  faHeart,
  faLock,
  faLockOpen,
  faPhone
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  id: number;
  user: User;
  posts: Array<Post>;
  displayedColumns: string[] = [];

  DEFAULT_IMAGE: string = "./assets/images/logo3.png";
  DEFAULT_IMAGE_USER = AppConfig.DEFAULT_IMAGE_USER;
  IMAGE_URL = AppConfig.IMAGE_URL;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private userService: UserService,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.userService.getUserById(this.id).subscribe(resp => {
        this.user = resp.data;

        if (this.user.imageUrl == null) {
          this.user.imageUrl = this.DEFAULT_IMAGE_USER;
        } else if ((this.user?.imageUrl.indexOf("http") == -1)) {
          this.user.imageUrl = this.IMAGE_URL + '/user/' + this.user.id + '/' + this.user.imageUrl;
        }

        this.postService.getPostByUserId(resp?.data?.id).subscribe(resp => {
          this.posts = resp.data;
        });
      });
    });
  }

  viewPost(postId: any) {
    this.router.navigate(["/post/" + postId]);
  }

  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faComments = faComments;
  faEllipsisV = faEllipsisV;
  faHeart = faHeart;
  faLock = faLock;
  faLockOpen = faLockOpen;
}
