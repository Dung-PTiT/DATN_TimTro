import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PostService} from "../../../service/post.service";
import {AuthenticationService} from "../../../service/authentication.service";
import {UserService} from "../../../service/user.service";
import {Post} from "../../../model/post";
import {User} from "../../../model/user";
import {faComments, faEllipsisV, faEnvelope, faHeart, faPhone} from "@fortawesome/free-solid-svg-icons";
import {AppConfig} from "../../../util/app-config";

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

  PREFIX_URL = AppConfig.PREFIX_URL;
  CONTEXT_URL: string = "";
  DEFAULT_IMAGE: string = "./assets/images/logo3.png";

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private userService: UserService,
              private authenticationService: AuthenticationService) {
    this.PREFIX_URL = this.PREFIX_URL + this.CONTEXT_URL + "/image/get?imageUrl=";
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.userService.getUserById(this.id).subscribe(resp => {
        this.user = resp.data;
        this.postService.getPostByUserId(resp?.data?.id).subscribe(resp => {
          this.posts = resp.data;
        });
      });
    });
  }

  viewUserPage(postId: any) {
    this.router.navigate(["/post/" + postId]);
  }

  viewPost(postId: any) {
    this.router.navigate(["/post/" + postId]);
  }

  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faComments = faComments;
  faEllipsisV = faEllipsisV;
  faHeart = faHeart;
}
