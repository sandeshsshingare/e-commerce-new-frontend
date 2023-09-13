import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  listOfOrders: any[] = [];
  totalResults: number = 0;
  paginationController = {
    limit: 5,
    page: 1,
  };
  constructor(private _orderService: OrderService, private _router: Router) {}

  ngOnInit(): void {
    this.getListOfOrders();
  }
  getListOfOrders() {
    this._orderService.getOrderList(this.paginationController).subscribe({
      next: (data: any) => {
        this.listOfOrders = data.results;
        this.totalResults = data.totalResults;
        console.log('list of orders', data);
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
}
