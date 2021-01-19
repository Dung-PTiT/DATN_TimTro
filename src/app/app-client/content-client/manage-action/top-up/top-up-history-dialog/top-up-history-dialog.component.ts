import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {TopUpHistory} from "../../../../../model/topUpHistory";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-top-up-history-dialog',
  templateUrl: './top-up-history-dialog.component.html',
  styleUrls: ['./top-up-history-dialog.component.css']
})
export class TopUpHistoryDialogComponent implements OnInit {

  topUpHistoryList: TopUpHistory[] = [];
  displayedTopUpHistory: string[] = [];
  dataSource: MatTableDataSource<TopUpHistory>;

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
}
