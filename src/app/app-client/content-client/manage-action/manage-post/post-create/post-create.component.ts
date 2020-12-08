import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ReplaySubject, Subject} from "rxjs";
import {MatSelect} from "@angular/material/select";
import {take, takeUntil} from "rxjs/operators";
import {MarkerInfo} from "../../../dashboard-client/dashboard-client.component";
import {AddressService} from "../../../../../service/address.service";
import {Provinces} from "../../../../../model/address/Provinces";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {AgmMap, MapsAPILoader} from "@agm/core";
import {PostService} from "../../../../../service/post.service";
import {District} from "../../../../../model/address/District";
import {Ward} from "../../../../../model/address/Ward";
import {ChangeEvent} from "@ckeditor/ckeditor5-angular";
import {CategoryService} from "../../../../../service/category.service";
import {Category} from "../../../../../model/category";
import {TagService} from "../../../../../service/tag.service";
import {Tag} from "../../../../../model/tag";
import {faCloudUploadAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  faCloudUploadAlt = faCloudUploadAlt;
  faTrash = faTrash;

  markerInfo: MarkerInfo;
  editor = ClassicEditor;
  editorData: string;
  province: Provinces;
  provinceList: Provinces[];
  district: District;
  districtList: District[];
  ward: Ward;
  wardList: Ward[];
  categoryList: Category[];
  tag: Tag;
  tagList: Tag[];
  imageList: File[] = [];


  public villageCtrl: FormControl = new FormControl();
  public addressCtrl: FormControl = new FormControl();
  public titlePostCtrl: FormControl = new FormControl();
  public tagCtrl: FormControl = new FormControl();
  public categoryCtrl: FormControl = new FormControl();
  public phoneNumberCtrl: FormControl = new FormControl();
  public priceCtrl: FormControl = new FormControl();
  public acreageCtrl: FormControl = new FormControl();
  public imageCtrl: FormControl = new FormControl();

  public provinceCtrl: FormControl = new FormControl();
  public provinceFilterCtrl: FormControl = new FormControl();
  public filteredProvinces: ReplaySubject<Provinces[]> = new ReplaySubject<Provinces[]>(1);
  @ViewChild('provinceSelect') provinceSelect: MatSelect;
  private _onDestroyProvince = new Subject<void>();

  public districtCtrl: FormControl = new FormControl();
  public districtFilterCtrl: FormControl = new FormControl();
  public filteredDistricts: ReplaySubject<District[]> = new ReplaySubject<District[]>(1);
  @ViewChild('districtSelect') districtSelect: MatSelect;
  private _onDestroyDistrict = new Subject<void>();

  public wardCtrl: FormControl = new FormControl();
  public wardFilterCtrl: FormControl = new FormControl();
  public filteredWards: ReplaySubject<Ward[]> = new ReplaySubject<Ward[]>(1);
  @ViewChild('wardSelect') wardSelect: MatSelect;
  private _onDestroyWard = new Subject<void>();

  constructor(private addressService: AddressService,
              private postService: PostService,
              private categoryService: CategoryService,
              private tagService: TagService,
              private apiloader: MapsAPILoader,
              private router: Router) {
    ClassicEditor.defaultConfig = {
      toolbar: {
        items: [
          'heading',
          '|',
          'alignment',
          'bold',
          'italic',
          'bulletedList',
          'numberedList',
          'undo',
          'redo'
        ]
      },
      language: 'vn'
    };
  }

  ngOnInit() {
    this.addressService.getAllProvinces().subscribe(resp => {
      this.provinceList = resp.data;
      this.provinceCtrl.setValue(this.provinceList[1]);
      this.filteredProvinces.next(this.provinceList.slice());
      this.provinceFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroyProvince))
        .subscribe(() => {
          this.filterProvinces();
        });
    });

    this.markerInfo = new MarkerInfo(20.981149, 105.787480, "./assets/images/marker3.png",
      "");

    this.provinceCtrl.valueChanges.subscribe(province => {
      this.addressService.getProvinceById(province.id).subscribe(
        resp => {
          this.districtList = resp.data.districts;
          this.districtCtrl.setValue(this.districtList[0]);
          this.filteredDistricts.next(this.districtList.slice());
          this.districtFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroyDistrict))
            .subscribe(() => {
              this.filterDistrict();
            });
          this.genAddressStr();
        });
    });

    this.districtCtrl.valueChanges.subscribe(district => {
      this.addressService.getDistrictById(district.id).subscribe(
        resp => {
          this.wardList = resp.data.wards;
          this.wardCtrl.setValue(this.wardList[0]);
          this.filteredWards.next(this.wardList.slice());
          this.wardFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroyWard))
            .subscribe(() => {
              this.filterWard();
            });
          this.genAddressStr();
        });
    });

    this.wardCtrl.valueChanges.subscribe(ward => {
      this.genAddressStr();
    });

    this.villageCtrl.valueChanges.subscribe(village => {
      this.genAddressStr();
    });

    this.categoryService.getAll().subscribe(resp => {
      this.categoryList = resp.data;
    });

    this.categoryCtrl.valueChanges.subscribe(resp => {
    });

    this.tagService.getAll().subscribe(resp => {
      this.tagList = resp.data;
    });

    this.tagCtrl.valueChanges.subscribe(resp => {
    });
  }

  genAddressStr() {
    this.addressCtrl.setValue(
      (this.villageCtrl?.value ? this.villageCtrl.value : '')
      + ', '
      + (this.wardCtrl.value?.prefix ? this.wardCtrl.value.prefix : '')
      + ' '
      + (this.wardCtrl.value?.name ? this.wardCtrl.value.name : '')
      + ', '
      + (this.districtCtrl.value?.prefix ? this.districtCtrl.value.prefix : '')
      + ' '
      + (this.districtCtrl.value?.name ? this.districtCtrl.value.name : '')
      + ', '
      + (this.provinceCtrl.value?.name ? this.provinceCtrl.value.name : '')
    );
  }

  // GG Map
  @ViewChild(AgmMap, {static: true}) public agmMap: AgmMap;

  getLocation(event) {
    this.markerInfo = new MarkerInfo(event.coords.lat, event.coords.lng, "./assets/images/marker3.png","");
  }

  public onChange({editor}: ChangeEvent) {
    this.editorData = editor.getData();
  }

  // Create post
  createPost() {
    let formData = new FormData();
    formData.append("title", this.titlePostCtrl.value);
    formData.append("content", this.editorData ? this.editorData : '');
    formData.append("price", this.priceCtrl.value);
    formData.append("acreage", this.acreageCtrl.value);
    formData.append("address", this.villageCtrl.value);
    formData.append("phoneNumber", this.phoneNumberCtrl.value);
    formData.append("latitude", this.markerInfo.latitude.toString());
    formData.append("longitude", this.markerInfo.longitude.toString());
    formData.append("wardStr", JSON.stringify(this.wardCtrl.value));
    formData.append("districtStr", JSON.stringify(this.districtCtrl.value));
    formData.append("provinceStr", JSON.stringify(this.provinceCtrl.value));
    formData.append("categoryStr", JSON.stringify(this.categoryCtrl.value));
    formData.append("tagsStr", JSON.stringify(this.tagCtrl.value));

    this.imageList.forEach((file, i) => {
      formData.append("files[" + i + "]", file);
    });
    this.postService.createPost(formData).subscribe(resp => {
      if(resp.success == true){
        this.router.navigate(['/manage/post/list']);
      }
    });
  }

  //Image
  urls = [];

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();

        reader.onload = (event: any) => {
          this.urls.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
    this.imageList.push(event.target.files[0]);
  }

  removeImages(){
    this.urls = [];
    this.imageList = [];
  }

  // Search Province
  private setInitialValue() {
    this.filteredProvinces
      .pipe(take(1), takeUntil(this._onDestroyProvince))
      .subscribe(() => {
        this.provinceSelect.compareWith = (a: Provinces, b: Provinces) => a.id === b.id;
      });
  }

  private filterProvinces() {
    if (!this.provinceList) {
      return;
    }
    let search = this.provinceFilterCtrl.value;
    if (!search) {
      this.filteredProvinces.next(this.provinceList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredProvinces.next(
      this.provinceList.filter(province => province.name.toLowerCase().indexOf(search) > -1)
    );
  }

  //Search district
  private setInitialValueDistrict() {
    this.filteredDistricts
      .pipe(take(1), takeUntil(this._onDestroyDistrict))
      .subscribe(() => {
        this.districtSelect.compareWith = (a: District, b: District) => a.id === b.id;
      });
  }

  private filterDistrict() {
    if (!this.districtList) {
      return;
    }
    // get the search keyword
    let search = this.districtFilterCtrl.value;
    if (!search) {
      this.filteredDistricts.next(this.districtList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredDistricts.next(
      this.districtList.filter(district => district.name.toLowerCase().indexOf(search) > -1)
    );
  }

  // Search ward
  private setInitialValueWard() {
    this.filteredWards
      .pipe(take(1), takeUntil(this._onDestroyWard))
      .subscribe(() => {
        this.wardSelect.compareWith = (a: Ward, b: Ward) => a.id === b.id;
      });
  }

  private filterWard() {
    if (!this.wardList) {
      return;
    }
    // get the search keyword
    let search = this.wardFilterCtrl.value;
    if (!search) {
      this.filteredWards.next(this.wardList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredWards.next(
      this.wardList.filter(ward => ward.name.toLowerCase().indexOf(search) > -1)
    );
  }
}
