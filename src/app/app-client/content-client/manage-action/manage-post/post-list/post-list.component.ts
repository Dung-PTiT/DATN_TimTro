import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../../../service/authentication.service";
import {PostService} from "../../../../../service/post.service";
import {User} from "../../../../../model/user";
import {Post} from "../../../../../model/post";
import {AppConfig} from "../../../../../util/app-config";
import {
  faComments,
  faEllipsisV,
  faHeart,
  faLongArrowAltUp,
  faPencilAlt,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {MatDialog} from "@angular/material/dialog";
import {PostPushDialogComponent} from "../post-push-dialog/post-push-dialog.component";
import {ToastService} from "../../../../../service/toast.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  PREFIX_URL = AppConfig.PREFIX_URL;
  CONTEXT_URL: string = "";
  DEFAULT_IMAGE: string = "./assets/images/logo3.png";

  user: User;
  posts: Array<Post>;
  displayedColumns: string[] = [];

  constructor(private authenticationService: AuthenticationService,
              private postService: PostService,
              private router: Router,
              private matDialog: MatDialog,
              private toastService: ToastService) {
    this.PREFIX_URL = this.PREFIX_URL + this.CONTEXT_URL + "/image/get?imageUrl=";
  }

  ngOnInit(): void {
    this.displayedColumns = [
      'number', 'image', 'title', 'price', 'startDate', 'endDate', 'comment', 'favorite', 'status', 'action'
    ];

    if (JSON.parse(localStorage.getItem('userCurrent')) != null) {
      this.user = JSON.parse(localStorage.getItem('userCurrent'));
      this.postService.getPostByUserId(this.user.id).subscribe(resp => {
        this.posts = resp.data;
      });
    } else {
      if (this.authenticationService.checkLogin()) {
        this.authenticationService.getCurrentUser().subscribe(resp => {
          this.user = resp.data;
          this.postService.getPostByUserId(this.user.id).subscribe(resp => {
            this.posts = resp.data;
          });
        });
      }
    }
  }

  deletePost(postId: any) {
    Swal.fire({
      title: 'Bạn muốn xóa bài?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa',
      customClass: 'swal-confirm-style',
    }).then((result) => {
      if (result.value) {
        this.postService.deletePost(postId).subscribe(resp => {
          if (resp.success == true) {
            this.postService.getPostByUserId(this.user.id).subscribe(resp => {
              this.posts = resp.data;
            });
          } else {
            console.log("Error");
          }
        });
      }
    })
  }

  viewPost(postId: any) {
    this.router.navigate(["/post/" + postId]);
  }

  editPost(postId: any) {
    this.router.navigate(["/manage/post/update/" + postId]);
  }

  pushPost(post: Post) {
    if (post.status == true) {
      this.toastService.showWarning("Bài viết đang được đăng");
    } else {
      const dialogRef = this.matDialog.open(PostPushDialogComponent, {
        width: '600px',
        data: {data: post}
      });
    }
  }

  faTrash = faTrash;
  faPencilAlt = faPencilAlt;
  faEllipsisV = faEllipsisV;
  faLongArrowAltUp = faLongArrowAltUp;
  faComments = faComments;
  faHeart = faHeart;
}
