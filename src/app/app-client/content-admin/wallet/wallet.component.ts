import {Component, OnInit, ViewChild} from '@angular/core';
import {WalletService} from "../../../service/wallet.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Wallet} from "../../../model/wallet";
import {MatDialog} from "@angular/material/dialog";
import {ToastService} from "../../../service/toast.service";
import {faEllipsisV, faHistory, faPencilAlt, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {AppConfig} from "../../../util/app-config";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  wallets: Array<Wallet>;
  displayedWallet: string[] = [];
  dataSource: MatTableDataSource<Wallet>;

  IMAGE_URL = AppConfig.IMAGE_URL;
  DEFAULT_IMAGE_USER = AppConfig.DEFAULT_IMAGE_USER;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private walletService: WalletService,
              private matDialog: MatDialog,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.displayedWallet = ['number', 'user', 'balance', 'createTime', 'action'];

    this.walletService.getAll().subscribe(resp => {
      this.wallets = resp.data;
      if (this.wallets != null) {
        for (let i = 0; i < this.wallets.length; i++) {
          // @ts-ignore
          if (this.wallets[i]?.user?.imageUrl == null) {
            // @ts-ignore
            this.wallets[i]?.user?.imageUrl = this.DEFAULT_IMAGE_USER;
          } else { // @ts-ignore
            if ((this.wallets[i]?.user?.imageUrl.indexOf("http") == -1)) {
              // @ts-ignore
              this.wallets[i]?.user?.imageUrl = this.IMAGE_URL + '/user/' + this.wallets[i]?.user.id + '/' + this.wallets[i]?.user?.imageUrl;
            }
          }
        }
      }
      this.dataSource = new MatTableDataSource(resp.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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
  faHistory = faHistory;
}
