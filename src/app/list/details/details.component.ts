import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  productId: number | null = null;
  product: any | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private orderService: OrderService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = Number(params.get('productId'));
      this.loadProductDetails();
    });
  }

  loadProductDetails(): void {
    this.productService.getProductById(this.productId).subscribe(x => {
      this.product = x.data['product']

    });
  }
  addToOrder(productId: string): void {
    this.orderService.addToOrder(productId);
    this.snackbarService.showSuccess('Product added to order!');
  }
}
