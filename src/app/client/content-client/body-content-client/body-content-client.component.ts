import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-body-content-client',
  templateUrl: './body-content-client.component.html',
  styleUrls: ['./body-content-client.component.css']
})
export class BodyContentClientComponent implements OnInit {

  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  faSearch = faSearch;
  searchForm: FormGroup;

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
