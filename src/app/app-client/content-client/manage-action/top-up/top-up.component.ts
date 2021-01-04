import {Component, OnInit} from '@angular/core';
import {faArrowAltCircleRight} from "@fortawesome/free-regular-svg-icons";
import {PaypalService} from "../../../../service/paypal.service";

@Component({
  selector: 'app-top-up',
  templateUrl: './top-up.component.html',
  styleUrls: ['./top-up.component.css']
})
export class TopUpComponent implements OnInit {

  constructor(private payPalService: PaypalService) {
  }

  ngOnInit(): void {
  }

  topUp(){
    this.payPalService.makePayment(10).subscribe(resp => {
      console.log(resp);
      if(resp.status == "success"){
        window.open(resp.redirect_url);
      }
    });
  }

  paymentId: any;
  payerId: any;
  token: any;

  topUp1(){
    // this.payPalService.makePayment(3000).subscribe(resp => {
    //   console.log(resp);
    //   if(resp.status == "success"){
    //     window.open(resp.redirect_url);
    //   }
    // });
    // this.activatedRoute.params.subscribe((params: Params) => {
    //   this.paymentId = params['paymentId'];
    //   this.payerId = params['PayerID'];
    //   this.token = params['token'];
    // this.payPalService.completePayment(this.paymentId, this.payerId).subscribe(resp =>{
    //   console.log(resp);
    // });
    //   console.log(this.paymentId);
    //   console.log(this.payerId);
    //   console.log(this.token);
    // });
    this.payPalService.completePayment("PAYID-L7VRCSA2N873463V0422323N","FBUMMDE6DYCJQ" ).subscribe(resp =>{
      console.log(resp);
    });
  }

  faArrowAltCircleRight = faArrowAltCircleRight;
}
