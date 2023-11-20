import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private activeOrder: any[] = [];
  addToOrder(product): void {
    this.activeOrder.push(product);
  }

  getOrderDetails(): any[] {
    return this.activeOrder;
  }
}
