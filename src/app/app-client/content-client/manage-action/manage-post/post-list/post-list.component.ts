import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../../../../../service/authentication.service";
import {PostService} from "../../../../../service/post.service";
import {User} from "../../../../../model/user";
import {Post} from "../../../../../model/post";
import {AppConfig} from "../../../../../util/app-config";
import {
  faComments,
  faEllipsisV,
  faHeart, faLock, faLockOpen, faLongArrowAltDown,
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
  postEnable = [];
  postDisable = [];
  displayedColumns: string[] = [];
  displayedColumnsEnable: string[] = [];
  displayedColumnsDisable: string[] = [];
  dataSource: MatTableDataSource<Post>;
  dataSourceEnable: MatTableDataSource<Post>;
  dataSourceDisable: MatTableDataSource<Post>;

  @ViewChild('paginatorAll') paginator: MatPaginator;
  @ViewChild('sort') sort: MatSort;

  @ViewChild('paginatorEnable') paginatorPostEnable: MatPaginator;
  @ViewChild('sortPostEnable') sortPostEnable: MatSort;

  @ViewChild('paginatorDisable') paginatorPostDisable: MatPaginator;
  @ViewChild('sortPostDisable') sortPostDisable: MatSort;

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

    this.displayedColumnsEnable = [
      'number1', 'image1', 'title1', 'price1', 'createTime1', 'startDate1', 'endDate1', 'comment1', 'favorite1', 'status1', 'action1'
    ];

    this.displayedColumnsDisable = [
      'number2', 'image2', 'title2', 'price2', 'createTime2', 'startDate2', 'endDate2', 'comment2', 'favorite2', 'status2', 'action2'
    ];

    if (JSON.parse(localStorage.getItem('userCurrent')) != null) {
      this.user = JSON.parse(localStorage.getItem('userCurrent'));
      this.postService.getPostByUserId(this.user.id).subscribe(resp => {
        this.posts = resp.data;
        this.reloadPostList(this.posts);
      });
    } else {
      if (this.authenticationService.checkLogin()) {
        this.authenticationService.getCurrentUser().subscribe(resp => {
          this.user = resp.data;
          this.postService.getPostByUserId(this.user.id).subscribe(resp => {
            this.posts = resp.data;
            this.reloadPostList(this.posts);
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
              this.reloadPostList(this.posts);
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

  removePost(postId: any) {
    Swal.fire({
      title: 'Bạn muốn gỡ bài đăng?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Gỡ',
      customClass: 'swal-confirm-style',
    }).then((result) => {
      if (result.value) {
        this.postService.removePost(postId).subscribe(resp => {
          if (resp.success) {
            this.toastService.showSuccess(resp.data);
            this.postService.getPostByUserId(this.user.id).subscribe(resp => {
              this.posts = resp.data;
              this.reloadPostList(this.posts);
            });
          } else {
            this.toastService.showError(resp.data);
          }
        });
      }
    })
  }

  searchTag(filterValue: string, tabNumber: number) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    if (tabNumber == 1) {
      this.dataSource.filter = filterValue;
    }else if(tabNumber ==2){
      this.dataSourceEnable.filter = filterValue;
    }else if(tabNumber == 3){
      this.dataSourceDisable.filter = filterValue;
    }

  }

  reloadPostList(posts: any) {
    this.postEnable = [];
    this.postDisable = [];

    this.dataSource = new MatTableDataSource(posts);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (posts.length != 0) {
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].status) {
          this.postEnable.push(posts[i]);
        } else {
          this.postDisable.push(posts[i]);
        }
      }
    }
    this.dataSourceEnable = new MatTableDataSource(this.postEnable);
    this.dataSourceEnable.paginator = this.paginatorPostEnable;
    this.dataSourceEnable.sort = this.sortPostEnable;

    this.dataSourceDisable = new MatTableDataSource(this.postDisable);
    this.dataSourceDisable.paginator = this.paginatorPostDisable;
    this.dataSourceDisable.sort = this.sortPostDisable;
  }

  _setDataSource(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {
        case 0:
          !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
          break;
        case 1:
          !this.dataSourceEnable.paginator ? this.dataSourceEnable.paginator = this.paginatorPostEnable : null;
          break;
        case 2:
          !this.dataSourceDisable.paginator ? this.dataSourceDisable.paginator = this.paginatorPostDisable : null;
      }
    });
  }

  faTrash = faTrash;
  faPencilAlt = faPencilAlt;
  faEllipsisV = faEllipsisV;
  faLongArrowAltUp = faLongArrowAltUp;
  faLongArrowAltDown = faLongArrowAltDown;
  faComments = faComments;
  faHeart = faHeart;
  faLock = faLock;
  faLockOpen = faLockOpen;
}
