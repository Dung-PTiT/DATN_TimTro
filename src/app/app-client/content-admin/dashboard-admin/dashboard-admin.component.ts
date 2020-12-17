import {Component, OnInit} from '@angular/core';
import {faListAlt, faTasks, faUserCheck, faUserLock} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  faUserCheck = faUserCheck;
  faUserLock = faUserLock;
  faListAlt = faListAlt;
  faTasks = faTasks;
}
