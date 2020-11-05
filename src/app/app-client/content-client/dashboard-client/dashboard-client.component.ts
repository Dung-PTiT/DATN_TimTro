import { Component, OnInit } from '@angular/core';
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
import {map, startWith} from "rxjs/operators";

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

  first:number = 1;

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
    this.searchForm = new FormGroup({
      searchInp: new FormControl("")
    });
    this.filteredOptions = this.searchForm.controls.searchInp.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
