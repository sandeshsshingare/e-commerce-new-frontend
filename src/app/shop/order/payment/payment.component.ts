import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../service/order.service';
import { Store } from '@ngrx/store';
import { appState } from '../../store/app.state';
import { removeAllProduct } from '../../states/cart.action';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private _activeRoute: ActivatedRoute,
    private router: Router,
    private _orderService: OrderService,
    private _store: Store<appState>
  ) {}
  orderId: any;
  ngOnInit(): void {
    this.orderId = this._activeRoute.snapshot.paramMap.get('orderId');
    console.log(this.orderId);
  }

  makePayment(data: any) {
    let obj = {
      nameOnCard: data.nameOnCard,
      cardNumber: data.cardNumber,
      expiry: data.expiry,
      cvv: data.cvv,
    };

    this._orderService.makePayments(obj, this.orderId).subscribe({
      next: () => {
        this._store.dispatch(removeAllProduct());
        this.router.navigate(['/shop']);
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
}
