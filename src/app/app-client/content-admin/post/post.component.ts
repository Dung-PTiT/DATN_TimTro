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

}
