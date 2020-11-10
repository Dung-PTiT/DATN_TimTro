import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {
  faCalendarMinus,
  faDollarSign,
  faHeart,
  faImage,
  faMapMarkerAlt,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup} from "@angular/forms";

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.css']
})
export class DashboardClientComponent implements OnInit {

  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  faSearch = faSearch;
  faImage = faImage;
  faHeart = faHeart;
  faDollarSign = faDollarSign;
  faMapMarkerAlt = faMapMarkerAlt;
  faCalendarMinus = faCalendarMinus;
  searchForm: FormGroup;
  markerInfo: MarkerInfo;

  constructor() {
    this.searchForm = new FormGroup({
      searchInp: new FormControl()
    });
  }


  first: number = 1;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
    {value: 'tacos-3', viewValue: 'Tacos'},
    {value: 'tacos-4', viewValue: 'Tacos'},
    {value: 'tacos-5', viewValue: 'Tacos'},
    {value: 'tacos-6', viewValue: 'Tacos'},
    {value: 'tacos-7', viewValue: 'Tacos'},
    {value: 'tacos-8', viewValue: 'Tacos'},
    {value: 'tacos-9', viewValue: 'Tacos'},
    {value: 'tacos-10', viewValue: 'Tacos'}
  ];

  ngOnInit() {
    this.markerInfo = new MarkerInfo(20.981149, 105.787480, "./assets/images/marker3.png");
  }

}

export class MarkerInfo {
  constructor(
    public latitude: number,
    public longitude: number,
    public icon: string) {
  }
}
