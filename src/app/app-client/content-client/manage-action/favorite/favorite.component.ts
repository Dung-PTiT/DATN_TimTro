import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../../service/authentication.service";
import {FavoriteService} from "../../../../service/favorite.service";
import {Router} from "@angular/router";
import {User} from "../../../../model/user";
import {Favorite} from "../../../../model/favorite";
import {faComments} from "@fortawesome/free-solid-svg-icons";
import {faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import {faHeart as faHeartRegular} from "@fortawesome/free-regular-svg-icons";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {Post} from "../../../../model/post";
import {PostService} from "../../../../service/post.service";
import {MatDialog} from "@angular/material/dialog";
import {FavoriteDetailDialogComponent} from "./favorite-detail-dialog/favorite-detail-dialog.component";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  user: User;
  favorites: Array<Favorite>;
  posts: Array<Post>;
  columnTableMyFavorite: string[] = [];
  displayedColumns: string[] = [];

  constructor(private authenticationService: AuthenticationService,
              private favoriteService: FavoriteService,
              private postService: PostService,
              private router: Router,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.columnTableMyFavorite = [
      'number', 'post', 'createTime', 'action'
    ];
    this.displayedColumns = [
      'number', 'title', 'price', 'favorite', 'action'
    ];

    if (this.authenticationService.checkLogin()) {
      this.authenticationService.getCurrentUser().subscribe(resp => {
        this.user = resp.data;
        this.favoriteService.getFavoriteByUserId(this.user.id).subscribe(resp => {
          this.favorites = resp.data;
        });
        this.postService.getPostByUserId(this.user.id).subscribe(resp => {
          this.posts = resp.data;
        });
      });
    }
  }

  removeFavorite(postId: any) {
    Swal.fire({
      title: 'Bạn muốn gỡ quan tâm?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Gỡ',
      customClass: 'swal-confirm-style',
    }).then((result) => {
      if (result.value) {
        if (this.authenticationService.checkLogin()) {
          this.favoriteService.createFavorite(postId).subscribe(resp => {
            this.favoriteService.getFavoriteByUserId(this.user.id).subscribe(resp => {
              this.favorites = resp.data;
            });
          });
        }
      }
    })
  }

  viewPost(postId: any) {
    this.router.navigate(["/post/" + postId]);
  }

  showFavoriteInfo(postDetail) {
    this.openFavoriteDetailDiaglog(postDetail);
  }

  openFavoriteDetailDiaglog(postDetail) {
    const dialogRef = this.matDialog.open(FavoriteDetailDialogComponent, {
      width: '600px',
      maxHeight: '80vh',
      data: {data: postDetail}
    });
  }

  faHeartSolid = faHeartSolid;
  faHeartRegular = faHeartRegular;
  faEllipsisV = faEllipsisV;
  faComments = faComments;
}
