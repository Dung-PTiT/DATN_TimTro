import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {TopUpHistory} from "../../../../model/topUpHistory";

@Component({
  selector: 'app-top-up-history-dialog',
  templateUrl: './top-up-history-dialog.component.html',
  styleUrls: ['./top-up-history-dialog.component.css']
})
export class TopUpHistoryDialogComponent implements OnInit, AfterViewInit {

  topUpHistoryList: TopUpHistory[] = [];
  displayedTopUpHistory: string[] = [];
  dataSource: MatTableDataSource<TopUpHistory>;
  totalPrice: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<TopUpHistoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.topUpHistoryList = data;
    this.dataSource = new MatTableDataSource(this.topUpHistoryList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.displayedTopUpHistory = ['number', 'balance', 'createTime'];
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    for (let i = 0; i < this.topUpHistoryList.length; i++) {
      this.totalPrice += this.topUpHistoryList[i].balance;
    }
  }
}
