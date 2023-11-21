import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orders: any | null = null;

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.orders = this.orderService.getOrderDetails();
    console.log(this.orders);
    
  }
  navigateToDetails(): void {
    this.router.navigate(['list']);
  }
  clearAllOrders(): void {
    this.orderService.clearAllOrders();
    this.orders = []; 
  }
  clearOrder(orderId: string): void {
    this.orderService.clearOrder(orderId);
    this.orders = this.orders.filter(order => order.id !== orderId);
  }
}
