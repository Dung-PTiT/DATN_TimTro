import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {StripeService, StripeCardComponent} from 'ngx-stripe';
import {StripeCardElementOptions, StripeElementsOptions} from '@stripe/stripe-js';
import {ToastService} from "../../../../../service/toast.service";
import {StripePaymentService} from "../../../../../service/stripe-payment.service";
import {WalletService} from "../../../../../service/wallet.service";
import {UserService} from "../../../../../service/user.service";

declare var Stripe: any;

@Component({
  selector: 'app-stripe-dialog',
  templateUrl: './stripe-dialog.component.html',
  styleUrls: ['./stripe-dialog.component.css']
})
export class StripeDialogComponent implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#484cff',
        color: '#0b135f',
        lineHeight: '10px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '13px',
        '::placeholder': {
          color: '#0b135f'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  submitted = false;
  walletId: any;
  stripeTest: FormGroup;

  constructor(public dialogRef: MatDialogRef<StripeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private stripeService: StripeService,
              private toastService: ToastService,
              private stripePaymentService: StripePaymentService,
              private walletService: WalletService,
              private userService: UserService) {
    this.walletId = data;
  }

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
        balance: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
        balanceConfirm: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]]
      },
      {
        validator: MustMatch('balance', 'balanceConfirm')
      });
  }

  topUp(): void {
    this.submitted = true;

    if (this.stripeTest.invalid) {
      return;
    }

    const name = 'TimTroStripeTopUp';
    this.stripeService.createToken(this.card.element, {name}).subscribe((result) => {
      if (result.token) {
        this.stripePaymentService.createCharge(result.token.id, this.stripeTest.controls.balance.value).subscribe(resp => {
          if (resp.success) {
            this.walletService.update(this.stripeTest.controls.balance.value, this.walletId).subscribe(
              resp => {
                this.dialogRef.close(resp.success);
              }
            );
          } else {
            this.toastService.showError("Nạp tiền lỗi. Hãy thử lại");
          }
        });
      } else if (result.error) {
        this.toastService.showError("Chưa nhập thông tin thẻ");
      }
    });
  }

  close() {
    this.dialogRef.close("none");
  }

  get validator() {
    return this.stripeTest.controls;
  }

  faTimes = faTimes;
}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({mustMatch: true});
    } else {
      matchingControl.setErrors(null);
    }
  }
}
