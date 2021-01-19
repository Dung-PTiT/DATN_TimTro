import {Component, OnInit} from '@angular/core';
import {faArrowAltCircleRight, faHandPointRight} from "@fortawesome/free-regular-svg-icons";
import {PaypalService} from "../../../../service/paypal.service";
import {MatDialog} from "@angular/material/dialog";
import {PaypalDialogComponent} from "./paypal-dialog/paypal-dialog.component";
import {StripeDialogComponent} from "./stripe-dialog/stripe-dialog.component";
import {ToastService} from "../../../../service/toast.service";
import {User} from "../../../../model/user";
import {WalletService} from "../../../../service/wallet.service";
import {TopUpHistoryDialogComponent} from "../../../content-admin/wallet/top-up-history-dialog/top-up-history-dialog.component";
import {AuthenticationService} from "../../../../service/authentication.service";

@Component({
  selector: 'app-top-up',
  templateUrl: './top-up.component.html',
  styleUrls: ['./top-up.component.css']
})
export class TopUpComponent implements OnInit {

  user: User;

  constructor(private payPalService: PaypalService,
              private matDialog: MatDialog,
              private toastService: ToastService,
              private walletService: WalletService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userCurrent'));
  }


  openPaypalDialog() {
    const dialogRef = this.matDialog.open(PaypalDialogComponent, {
      width: '400px',
      height: 'auto',
      disableClose: true
    });
  }

  openStripeDialog() {
    const dialogRef = this.matDialog.open(StripeDialogComponent, {
      width: '550px',
      height: 'auto',
      data: this.user.wallet.id,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp == true) {
        this.toastService.showSuccess("Nạp tiền thành công");
        this.authenticationService.getCurrentUser().subscribe(resp => {
          this.user = resp.data;
          localStorage.setItem('userCurrent', JSON.stringify(resp.data));
          location.reload();
        });
      } else if (resp == false) {
        this.toastService.showError("Nạp tiền lỗi");
      } else if (resp == "none") {
      }
    });
  }

  openTopUpHistoryDialog(walletId: any) {
    this.walletService.getTopUpHistory(walletId).subscribe(resp => {
      if (resp.data.length != 0) {
        const dialogRef = this.matDialog.open(TopUpHistoryDialogComponent, {
          width: '550px',
          height: 'auto',
          data: resp.data
        });
      } else {
        this.toastService.showWarning("Chưa có lịch sử nạp tiền");
      }
    });
  }

  topUp() {
    this.payPalService.makePayment(20).subscribe(resp => {
      console.log(resp);
      if (resp.status == "success") {
        window.open(resp.redirect_url);
      }
    });
  }

  paymentId: any;
  payerId: any;
  token: any;

  topUp1() {
    this.payPalService.pay(11).subscribe(resp => {
      console.log(resp);
    });
  }

  faArrowAltCircleRight = faArrowAltCircleRight;
  faHandPointRight = faHandPointRight;
}
