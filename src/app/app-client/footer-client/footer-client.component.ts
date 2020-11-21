import {Component, OnInit} from '@angular/core';
import {faInbox, faMapMarkerAlt, faPhone} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-footer-client',
  templateUrl: './footer-client.component.html',
  styleUrls: ['./footer-client.component.css']
})
export class FooterClientComponent implements OnInit {

  faMapMarker = faMapMarkerAlt;
  faPhone = faPhone;
  faInbox = faInbox;

  constructor() {
  }

  ngOnInit(): void {
  }

}
