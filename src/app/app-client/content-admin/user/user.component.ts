import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {User} from "../../../model/user";
import {MatDialog} from "@angular/material/dialog";
import {ToastService} from "../../../service/toast.service";
import {UserService} from "../../../service/user.service";
import {faEllipsisV, faPencilAlt, faPlusCircle, faUsersCog, faUserTie} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {AppConfig} from "../../../util/app-config";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  displayedUser: string[] = [];
  dataSource: MatTableDataSource<User>;

  PREFIX_URL = AppConfig.PREFIX_URL;
  CONTEXT_URL: string = "";
  DEFAULT_IMAGE_USER = "./assets/images/avatar.png";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService,
              private matDialog: MatDialog,
              private toastService: ToastService) {
    this.PREFIX_URL = this.PREFIX_URL + this.CONTEXT_URL + "/image/get?imageUrl=";

    this.displayedUser = ['number', 'name', 'email', 'phoneNumber', 'role', 'createTime', 'action'];

    this.userService.getAll().subscribe(resp => {
      this.users = resp.data;
      this.dataSource = new MatTableDataSource(resp.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
  }

  openCreateUserDialog() {
  }


  openUpdateUserDialog(tag: any) {
  }

  blockUser(tag: any) {
    Swal.fire({
      title: 'Bạn muốn khóa người dùng?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa',
      customClass: 'swal-confirm-style',
    }).then((result) => {
    })
  }

  searchTag(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  faEllipsisV = faEllipsisV;
  faTrashAlt = faTrashAlt;
  faPlusCircle = faPlusCircle;
  faPencilAlt = faPencilAlt;
  faUsersCog = faUsersCog;
  faUserTie = faUserTie;
}
