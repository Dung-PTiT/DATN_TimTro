import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {User} from "../../../model/user";
import {MatDialog} from "@angular/material/dialog";
import {ToastService} from "../../../service/toast.service";
import {UserService} from "../../../service/user.service";
import {
  faEllipsisV, faInfoCircle, faLock, faLockOpen,
  faPencilAlt,
  faPlusCircle,
  faUsersCog,
  faUserTie
} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {AppConfig} from "../../../util/app-config";
import {UserCreateDialogComponent} from "./user-create-dialog/user-create-dialog.component";
import {Router} from "@angular/router";
import {UserUpdateDialogComponent} from "./user-update-dialog/user-update-dialog.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  displayedUser: string[] = [];
  dataSource: MatTableDataSource<User>;

  IMAGE_URL = AppConfig.IMAGE_URL;
  DEFAULT_IMAGE_USER = AppConfig.DEFAULT_IMAGE_USER;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService,
              private matDialog: MatDialog,
              private toastService: ToastService,
              private router: Router) {
    this.displayedUser = ['number', 'name', 'role', 'status', 'email', 'phoneNumber', 'createTime', 'authProvider', 'action'];

    this.userService.getAll().subscribe(resp => {
      this.users = resp.data;
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].imageUrl == null) {
          this.users[i].imageUrl = this.DEFAULT_IMAGE_USER;
        } else if ((this.users[i]?.imageUrl?.indexOf("http") == -1)) {
          this.users[i].imageUrl = this.IMAGE_URL + '/user/' + this.users[i].id + '/' + this.users[i].imageUrl;
        }
      }
      this.dataSource = new MatTableDataSource(resp.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
  }

  openCreateUserDialog() {
    const dialogRef = this.matDialog.open(UserCreateDialogComponent, {
      width: '600px',
      height: 'auto',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp.success == true) {
        this.userService.getAll().subscribe(resp => {
          this.users = resp.data;
          for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].imageUrl == null) {
              this.users[i].imageUrl = this.DEFAULT_IMAGE_USER;
            } else if ((this.users[i]?.imageUrl?.indexOf("http") == -1)) {
              this.users[i].imageUrl = this.IMAGE_URL + '/user/' + this.users[i].id + '/' + this.users[i].imageUrl;
            }
          }
          this.dataSource = new MatTableDataSource(resp.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        this.toastService.showSuccess(resp.data);
      } else if (resp.success == "none") {
      }
    });
  }

  openUpdateUserDialog(user: any) {
    const dialogRef = this.matDialog.open(UserUpdateDialogComponent, {
      width: '800px',
      height: 'auto',
      disableClose: true,
      data: user
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp.success == true) {
        this.userService.getAll().subscribe(resp => {
          this.users = resp.data;
          for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].imageUrl == null) {
              this.users[i].imageUrl = this.DEFAULT_IMAGE_USER;
            } else if ((this.users[i]?.imageUrl.indexOf("http") == -1)) {
              this.users[i].imageUrl = this.IMAGE_URL + '/user/' + this.users[i].id + '/' + this.users[i].imageUrl;
            }
          }
          this.dataSource = new MatTableDataSource(resp.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        this.toastService.showSuccess(resp.data);
      } else if (resp.success == "none") {
      }
    });
  }

  deleteUser(user: User) {
    Swal.fire({
      title: 'Bạn muốn xóa tài khoản?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa',
      customClass: 'swal-confirm-style',
    }).then((result) => {
      if (result.value) {
        this.userService.delete(user.id).subscribe(resp => {
          if (resp.success) {
            this.userService.getAll().subscribe(resp => {
              this.users = resp.data;
              for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].imageUrl == null) {
                  this.users[i].imageUrl = this.DEFAULT_IMAGE_USER;
                } else if ((this.users[i]?.imageUrl?.indexOf("http") == -1)) {
                  this.users[i].imageUrl = this.IMAGE_URL + '/user/' + this.users[i].id + '/' + this.users[i].imageUrl;
                }
              }
              this.dataSource = new MatTableDataSource(resp.data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            });
            this.toastService.showSuccess(resp.data);

          } else {
            this.toastService.showError(resp.data);
          }
        });
      }
    })
  }

  viewInfoUser(user: User) {
    this.router.navigate(['/user/' + user.id]);
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
  faLock = faLock;
  faLockOpen = faLockOpen;
  faInfoCircle = faInfoCircle;
}
