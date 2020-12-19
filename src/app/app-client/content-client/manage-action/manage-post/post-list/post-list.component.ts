import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../../../../../service/authentication.service";
import {PostService} from "../../../../../service/post.service";
import {User} from "../../../../../model/user";
import {Post} from "../../../../../model/post";
import {AppConfig} from "../../../../../util/app-config";
import {
  faComments,
  faEllipsisV,
  faHeart, faLock, faLockOpen,
  faLongArrowAltUp,
  faPencilAlt,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {MatDialog} from "@angular/material/dialog";
import {PostPushDialogComponent} from "../post-push-dialog/post-push-dialog.component";
import {ToastService} from "../../../../../service/toast.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

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
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private authenticationService: AuthenticationService,
              private postService: PostService,
              private router: Router,
              private matDialog: MatDialog,
              private toastService: ToastService) {
    this.PREFIX_URL = this.PREFIX_URL + this.CONTEXT_URL + "/image/get?imageUrl=";
  }

  ngOnInit(): void {
    this.displayedColumns = [
      'number', 'image', 'title', 'price', 'createTime', 'startDate', 'endDate', 'comment', 'favorite', 'status', 'action'
    ];

    if (JSON.parse(localStorage.getItem('userCurrent')) != null) {
      this.user = JSON.parse(localStorage.getItem('userCurrent'));
      this.postService.getPostByUserId(this.user.id).subscribe(resp => {
        this.posts = resp.data;
        this.dataSource = new MatTableDataSource(resp.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    } else {
      if (this.authenticationService.checkLogin()) {
        this.authenticationService.getCurrentUser().subscribe(resp => {
          this.user = resp.data;
          this.postService.getPostByUserId(this.user.id).subscribe(resp => {
            this.posts = resp.data;
            this.dataSource = new MatTableDataSource(resp.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
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
            this.toastService.showSuccess(resp.data);
            this.postService.getPostByUserId(this.user.id).subscribe(resp => {
              this.posts = resp.data;
              this.dataSource = new MatTableDataSource(resp.data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            });
          } else {
            this.toastService.showError(resp.data);
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
        height: 'auto',
        data: {data: post}
      });
    }
  }

  searchTag(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


  faTrash = faTrash;
  faPencilAlt = faPencilAlt;
  faEllipsisV = faEllipsisV;
  faLongArrowAltUp = faLongArrowAltUp;
  faComments = faComments;
  faHeart = faHeart;
  faLock = faLock;
  faLockOpen = faLockOpen;
}
