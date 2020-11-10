import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MarkerInfo} from "../dashboard-client/dashboard-client.component";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {


  constructor(private router: Router, private route: ActivatedRoute) {
  }

  id: number;
  markerInfo: MarkerInfo;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      console.log(this.id);
    });
    this.markerInfo = new MarkerInfo(20.981149, 105.787480, "./assets/images/marker3.png");
  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}


