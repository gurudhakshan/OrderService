import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderService } from './order.service'; // Rename your service file accordingly

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'orderservice';

  constructor(private orderService: OrderService) { // Update service injection
    this.getOrderDetails();
  }

  register(orderForm: NgForm) {
    this.orderService.registerOrder(orderForm.value).subscribe(
      (resp: any) => {
        console.log(resp);
        orderForm.reset();
        this.getOrderDetails();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getOrderDetails() {
    this.orderService.getOrders().subscribe(
      (resp: any) => {
        console.log(resp);
        this.orderDetails = resp;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  orderDetails = null as any;

  deleteOrder(order: any) {
    this.orderService.deleteOrder(order.orderId).subscribe(
      (resp) => {
        console.log(resp);
        this.getOrderDetails();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  orderToUpdate = {
    orderId: null,
    customerName: '',
    product: '',
    quantity: 0
  };

  edit(order: any) {
    this.orderToUpdate = order;
  }

  updateOrder() {
    this.orderService.updateOrder(this.orderToUpdate).subscribe(
      (resp) => {
        console.log(resp);
        this.getOrderDetails();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
