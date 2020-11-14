import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ReplaySubject, Subject} from "rxjs";
import {MatSelect} from "@angular/material/select";
import {take, takeUntil} from "rxjs/operators";
import {MarkerInfo} from "../../../dashboard-client/dashboard-client.component";
import {AddressService} from "../../../../../service/address.service";
import {Provinces} from "../../../../../model/address/Provinces";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  public Editor = ClassicEditor;
  province: Provinces;
  provinceList: Provinces[];
  markerInfo: MarkerInfo;

  constructor(public addressService: AddressService) {
  }

  /** form select */
  public provinceCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public provinceFilterCtrl: FormControl = new FormControl();

  /** list of provinces filtered by search keyword */
  public filteredProvinces: ReplaySubject<Provinces[]> = new ReplaySubject<Provinces[]>(1);

  @ViewChild('provinceSelect') provinceSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  ngOnInit() {
    this.addressService.getAllProvinces().subscribe(resp => {
      this.provinceList = resp.data;
      // Phần tử mảng được khởi tạo
      this.provinceCtrl.setValue(this.provinceList[1]);
      // load the initial province list
      this.filteredProvinces.next(this.provinceList.slice());
      // listen for search field value changes
      this.provinceFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterProvinces();
        });
    });
    this.markerInfo = new MarkerInfo(20.981149, 105.787480, "./assets/images/marker3.png", "abc");
  }

  callType(value) {
    console.log(1);
    console.log(value);
  }

  /**
   * Sets the initial value after the filteredProvinces are loaded initially
   */
  private setInitialValue() {
    this.filteredProvinces
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredProvinces are loaded initially
        // and after the mat-option elements are available
        this.provinceSelect.compareWith = (a: Provinces, b: Provinces) => a.id === b.id;
      });
  }

  private filterProvinces() {
    if (!this.provinceList) {
      return;
    }
    // get the search keyword
    let search = this.provinceFilterCtrl.value;
    if (!search) {
      this.filteredProvinces.next(this.provinceList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the provinces
    this.filteredProvinces.next(
      this.provinceList.filter(province => province.name.toLowerCase().indexOf(search) > -1)
    );
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
