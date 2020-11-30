import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../../../service/authentication.service";
import {PostService} from "../../../../../service/post.service";
import {User} from "../../../../../model/user";
import {Post} from "../../../../../model/post";
import {AppConfig} from "../../../../../util/app-config";
import {faEllipsisV, faLongArrowAltUp, faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons/faArrowUp";


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  displayedColumns: string[] = [
    'number', 'image', 'title', 'price', 'startDate', 'endDate', 'status', 'action'
  ];

  PREFIX_URL = AppConfig.PREFIX_URL;
  CONTEXT_URL: string = "";
  DEFAULT_IMAGE: string = "./assets/images/logo3.png";

  user: User;
  posts: Array<Post>;

  constructor(private authenticationService: AuthenticationService,
              private postService: PostService,
              private router: Router) {
    this.PREFIX_URL = this.PREFIX_URL + this.CONTEXT_URL + "/image/get?imageUrl=";
  }

  ngOnInit(): void {
    if (this.authenticationService.checkLogin()) {
      this.authenticationService.getCurrentUser().subscribe(resp => {
        this.user = resp.data;
        this.postService.getPostByUserId(this.user.id).subscribe(resp => {
          this.posts = resp.data;
          console.log(this.posts);
        });
      });
    }
  }

  editPost(postId: any) {
    console.log(postId);
  }

  deletePost(postId: any) {
    console.log(postId);
  }

  viewPost(postId: any) {
    this.router.navigate(["/post/" + postId]);
  }

  faTrash = faTrash;
  faPencilAlt = faPencilAlt;
  faEllipsisV = faEllipsisV;
  faLongArrowAltUp = faLongArrowAltUp;
}
