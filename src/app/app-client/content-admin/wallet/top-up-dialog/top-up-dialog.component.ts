import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {Wallet} from "../../../../model/wallet";
import {WalletService} from "../../../../service/wallet.service";

@Component({
  selector: 'app-top-up-dialog',
  templateUrl: './top-up-dialog.component.html',
  styleUrls: ['./top-up-dialog.component.css']
})
export class TopUpDialogComponent implements OnInit {

  submitted = false;
  topUpForm: FormGroup;
  currentWallet: Wallet;
  balanceTopUp: number;
  totalBalance: number;

  constructor(public dialogRef: MatDialogRef<TopUpDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private walletService: WalletService) {
    this.currentWallet = data;
    this.balanceTopUp = 0;
    this.totalBalance = this.balanceTopUp + this.currentWallet.balance;
  }

  ngOnInit(): void {
    this.topUpForm = this.formBuilder.group(
      {
        balance: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
        balanceConfirm: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]]
      },
      {
        validator: MustMatch('balance', 'balanceConfirm')
      });
  }

  topUp() {
    this.submitted = true;

    if (this.topUpForm.invalid) {
      return;
    }

    this.walletService.update(this.topUpForm.controls.balance.value, this.currentWallet.id).subscribe(
      resp => {
        this.dialogRef.close(resp.success);
      }
    );
  }

  balanceChange(){
    this.balanceTopUp = this.topUpForm.controls.balance.value;
    this.totalBalance = this.balanceTopUp + this.currentWallet.balance;
  }

  get validator() {
    return this.topUpForm.controls;
  }

  close() {
    this.dialogRef.close("none");
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
