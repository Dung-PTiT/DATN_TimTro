import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastrService: ToastrService) {
  }

  showSuccess(message) {
    this.toastrService.success(message)
  }

  showError(message) {
    this.toastrService.error(message)
  }

  showInfo(message) {
    this.toastrService.info(message)
  }

  showWarning(message) {
    this.toastrService.warning(message)
  }
}
