import {Component, OnInit, ViewChild} from '@angular/core';
import {AppConfig} from "../../../util/app-config";
import {User} from "../../../model/user";
import {Post} from "../../../model/post";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AuthenticationService} from "../../../service/authentication.service";
import {PostService} from "../../../service/post.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ToastService} from "../../../service/toast.service";
import {
  faComments,
  faEllipsisV, faHeart, faLock, faLockOpen,
  faLongArrowAltDown,
  faLongArrowAltUp,
  faPencilAlt,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

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
      'number', 'image', 'title', 'price', 'acreage', 'createTime', 'category', 'status', 'action'
    ];

    if (JSON.parse(localStorage.getItem('userCurrent')) != null) {
      this.user = JSON.parse(localStorage.getItem('userCurrent'));
      this.postService.getAll().subscribe(resp => {
        this.posts = resp.data;
        this.dataSource = new MatTableDataSource(resp.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
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
            this.postService.getAll().subscribe(resp => {
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

  reloadPostList(posts: any) {
    this.dataSource = new MatTableDataSource(posts);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  searchTag(filterValue: string, tabNumber: number) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
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
