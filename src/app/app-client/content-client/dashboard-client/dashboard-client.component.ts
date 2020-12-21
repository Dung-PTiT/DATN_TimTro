import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {
  faCalendarMinus, faDollarSign, faImage, faMapMarkerAlt, faSearch
} from "@fortawesome/free-solid-svg-icons";
import {faHeart as faHeartRegular} from "@fortawesome/free-regular-svg-icons";
import {faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup} from "@angular/forms";
import {PostService} from "../../../service/post.service";
import {Post} from "../../../model/post";
import {ImageService} from "../../../service/image.service";
import {AppConfig} from "../../../util/app-config";
import {AuthenticationService} from "../../../service/authentication.service";
import {FavoriteService} from "../../../service/favorite.service";
import {User} from "../../../model/user";
import {Favorite} from "../../../model/favorite";
import * as moment from 'moment';
import {Provinces} from "../../../model/address/Provinces";
import {District} from "../../../model/address/District";
import {Ward} from "../../../model/address/Ward";
import {MatSelect} from "@angular/material/select";
import {AddressService} from "../../../service/address.service";
import {take, takeUntil} from "rxjs/operators";
import {Category} from "../../../model/category";
import {CategoryService} from "../../../service/category.service";
import {Payment} from "../../../model/payment";
import {PaymentService} from "../../../service/payment.service";

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.css']
})
export class DashboardClientComponent implements OnInit {

  filteredOptions: Observable<string[]>;
  searchForm: FormGroup;
  markerInfo: MarkerInfo;
  payments: Array<Payment>;
  user: User;
  favorites: Array<Favorite>;
  postIdFavorites: Number[] = [];
  province: Provinces;
  provinceList: Provinces[];
  district: District;
  districtList: District[];
  ward: Ward;
  wardList: Ward[];
  category: Category;
  categories: Array<Category>;
  priceRange: any;
  acreageRange: any;

  IMAGE_URL = AppConfig.IMAGE_URL;
  DEFAULT_IMAGE = AppConfig.DEFAULT_IMAGE;

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

  public categorySearchCtrl: FormControl = new FormControl();
  public priceSearchCtrl: FormControl = new FormControl();
  public acreageSearchCtrl: FormControl = new FormControl();

  constructor(private addressService: AddressService,
              private postService: PostService,
              private imageService: ImageService,
              private authenticationService: AuthenticationService,
              private favoriteService: FavoriteService,
              private categoryService: CategoryService,
              private paymentService: PaymentService) {
    this.searchForm = new FormGroup({
      searchInp: new FormControl()
    });
    this.paymentService.fetchEnablePost(null, null, null, null, null, null, null, null).subscribe(resp => {
      this.payments = resp.data;
    });
    this.categoryService.getAll().subscribe(resp => {
      this.categories = resp.data;
    });
    this.priceRange = [
      {
        value: "0-1000000",
        name: "Nhỏ hơn 1 triệu"
      },
      {
        value: "1000000-3000000",
        name: "1 triệu -> 3 triệu"
      },
      {
        value: "3000000-5000000",
        name: "3 triệu -> 5 triệu"
      },
      {
        value: "5000000-10000000",
        name: "5 triệu -> 10 triệu"
      },
      {
        value: "10000000-100000000",
        name: "Lớn hơn 10 triệu"
      }
    ];

    this.acreageRange = [
      {
        value: "0-20",
        name: "Nhỏ hơn 20m2"
      },
      {
        value: "20-30",
        name: "20m2 -> 30m2"
      },
      {
        value: "30-50",
        name: "30m2 -> 50m2"
      },
      {
        value: "50-200",
        name: "Lớn hơn 50m2"
      }
    ];
  }

  ngOnInit() {
    this.addressService.getAllProvinces().subscribe(resp => {
      this.provinceList = resp.data;
      // this.provinceCtrl.setValue(this.provinceList[1]);
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
        });
    });

    this.markerInfo = new MarkerInfo(20.981149, 105.787480, "./assets/images/marker3.png", "abc");

    if (JSON.parse(localStorage.getItem('userCurrent')) != null) {
      this.user = JSON.parse(localStorage.getItem('userCurrent'));
      this.favoriteService.getFavoriteByUserId(this.user.id).subscribe(resp => {
        this.favorites = resp.data;
        if (this.favorites.length != 0) {
          for (let i = 0; i < this.favorites.length; i++) {
            this.postIdFavorites.push(this.favorites[i].post.id);
          }
        }
      });
    } else {
      if (this.authenticationService.checkLogin()) {
        this.authenticationService.getCurrentUser().subscribe(resp => {
          this.user = resp.data as User;
          this.favoriteService.getFavoriteByUserId(this.user.id).subscribe(resp => {
            this.favorites = resp.data;
            if (this.favorites.length != 0) {
              for (let i = 0; i < this.favorites.length; i++) {
                this.postIdFavorites.push(this.favorites[i].post.id);
              }
            }
          });
        });
      }
    }
  }

  createFavorite(postId: any) {
    this.postIdFavorites = [];
    if (this.authenticationService.checkLogin()) {
      this.favoriteService.createFavorite(postId).subscribe(resp => {
        this.favoriteService.getFavoriteByUserId(this.user.id).subscribe(resp => {
          this.favorites = resp.data;
          if (this.favorites.length != 0) {
            for (let i = 0; i < this.favorites.length; i++) {
              this.postIdFavorites.push(this.favorites[i].post.id);
            }
          }
        });
      });
    } else {
      location.replace('/login');
    }
  }

  timespan(time: Date) {
    return moment(time).startOf("second").fromNow();
  }


  btnSearchClick() {
    let provinceId, districtId, wardId, minPrice, maxPrice, minAcreage, maxAcreage, categoryId;

    if (this.provinceCtrl.value == null) {
      provinceId = null;
    } else {
      provinceId = this.provinceCtrl.value.id;
    }
    if (this.districtCtrl.value == null) {
      districtId = null;
    } else {
      districtId = this.districtCtrl.value.id;
    }
    if (this.wardCtrl.value == null) {
      wardId = null;
    } else {
      wardId = this.wardCtrl.value.id;
    }
    if (this.priceSearchCtrl.value == null) {
      minPrice = null;
      maxPrice = null;
    } else {
      minPrice = this.priceSearchCtrl.value?.value.split("-", 2)[0];
      maxPrice = this.priceSearchCtrl.value?.value.split("-", 2)[1];
    }
    if (this.acreageSearchCtrl.value == null) {
      minAcreage = null;
      maxAcreage = null;
    } else {
      minAcreage = this.acreageSearchCtrl.value?.value.split("-", 2)[0];
      maxAcreage = this.acreageSearchCtrl.value?.value.split("-", 2)[1];
    }
    if (this.categorySearchCtrl.value == null) {
      categoryId = null;
    } else {
      categoryId = this.categorySearchCtrl.value.id;
    }

    this.paymentService.fetchEnablePost(provinceId, districtId, wardId,
      minPrice, maxPrice, minAcreage, maxAcreage, categoryId).subscribe(resp => {
      this.payments = resp.data;
    });
  }

  btnShowAllPosts(){
    this.paymentService.fetchEnablePost(null, null, null, null, null, null, null, null).subscribe(resp => {
      this.payments = resp.data;
    });
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

  faSearch = faSearch;
  faImage = faImage;
  faHeartRegular = faHeartRegular;
  faHeartSolid = faHeartSolid;
  faDollarSign = faDollarSign;
  faMapMarkerAlt = faMapMarkerAlt;
  faCalendarMinus = faCalendarMinus;
}

export class MarkerInfo {
  constructor(
    public latitude: number,
    public longitude: number,
    public icon: string,
    public address: string) {
  }
}
