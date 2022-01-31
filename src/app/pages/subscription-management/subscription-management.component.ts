import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-subscription-management',
  templateUrl: './subscription-management.component.html',
  styleUrls: ['./subscription-management.component.scss']
})
export class SubscriptionManagementComponent implements OnInit {

  @ViewChild('paypalRef', {static: true}) private paypalRef: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
    console.log(window.paypal);

    window.paypal.Buttons(
      {
        style: {
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'paypal'
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: 150,
                  currency_code: 'EUR'
                }
              }
            ]
          })
        },
        onApprove: (date, actions) => {
          return actions.order.capture().then((details) => {
              console.log(details);
              alert('Transaction OK');
            }
          )
        },
        onError: error => {
          console.log(error);
        }
      }
    ).render(this.paypalRef.nativeElement)
  }

}
