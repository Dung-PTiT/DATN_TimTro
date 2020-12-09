import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../../service/authentication.service";
import {CommentService} from "../../../../service/comment.service";
import {Router} from "@angular/router";
import {User} from "../../../../model/user";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  user: User;
  comments: Array<Comment>;
  displayedComment: string[] = [];

  constructor(private authenticationService: AuthenticationService,
              private commentService: CommentService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.displayedComment = [
      'number', 'content', 'createTime', 'post', 'action'
    ];

    if (JSON.parse(localStorage.getItem('userCurrent')) != null) {
      this.user = JSON.parse(localStorage.getItem('userCurrent'));
      this.commentService.getCommentByUserId(this.user.id).subscribe(resp => {
        this.comments = resp.data;
      });
    } else {
      if (this.authenticationService.checkLogin()) {
        this.authenticationService.getCurrentUser().subscribe(resp => {
          this.user = resp.data;
          this.commentService.getCommentByUserId(this.user.id).subscribe(resp => {
            this.comments = resp.data;
          });
        });
      }
    }
  }

  viewPost(postId: any) {
    this.router.navigate(["/post/" + postId]);
  }

  deleteComment(commentId: any) {
    Swal.fire({
      title: 'Bạn muốn xóa bình luận?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa',
      customClass: 'swal-confirm-style',
    }).then((result) => {
      if (result.value) {
        if (this.authenticationService.checkLogin()) {
          this.commentService.deleteComment(commentId).subscribe(resp => {
            this.commentService.getCommentByUserId(this.user.id).subscribe(resp => {
              this.comments = resp.data;
            });
          });
        }
      }
    })
  }

  faEllipsisV = faEllipsisV;
  faTrashAlt = faTrashAlt;
}
