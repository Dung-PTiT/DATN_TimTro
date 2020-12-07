import {Component, OnInit} from '@angular/core';
import {faArrowAltCircleRight} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-top-up',
  templateUrl: './top-up.component.html',
  styleUrls: ['./top-up.component.css']
})
export class TopUpComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  faArrowAltCircleRight = faArrowAltCircleRight;
}
