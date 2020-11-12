import {Component, OnInit} from '@angular/core';
import {faComments, faEdit, faHeart, faHistory, faList, faMoneyCheckAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-manage-action',
  templateUrl: './manage-action.component.html',
  styleUrls: ['./manage-action.component.css']
})
export class ManageActionComponent implements OnInit {

  faEdit = faEdit;
  faHeart = faHeart;
  faComments = faComments;
  faList = faList;
  faMoneyCheckAlt = faMoneyCheckAlt;
  faHistory = faHistory;

  constructor() {
  }

  ngOnInit(): void {
  }

}
