import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../model/user";
import {Payment} from "../../../model/payment";
import {MatTableDataSource} from "@angular/material/table";
import {AppConfig} from "../../../util/app-config";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AuthenticationService} from "../../../service/authentication.service";
import {PaymentService} from "../../../service/payment.service";
import {Router} from "@angular/router";
import {faEllipsisV, faLock, faLockOpen} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import * as moment from 'moment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  user: User;
  payments: Array<Payment>;
  displayedPayment: string[] = [];
  dataSource: MatTableDataSource<Payment>;

  IMAGE_URL = AppConfig.IMAGE_URL;
  DEFAULT_IMAGE_USER = AppConfig.DEFAULT_IMAGE_USER;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private authenticationService: AuthenticationService,
              private paymentService: PaymentService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.displayedPayment = [
      'number', 'price', 'startDate', 'endDate', 'status', 'post'
    ];
    this.paymentService.getAll().subscribe(resp => {
      this.payments = resp.data;
      this.dataSource = new MatTableDataSource(resp.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  viewPost(postId: any) {
    this.router.navigate(["/post/" + postId]);
  }

  faEllipsisV = faEllipsisV;
  faTrashAlt = faTrashAlt;
  faLock = faLock;
  faLockOpen = faLockOpen;
}
