import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { productListReducer } from './product-list.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature('productList', productListReducer),
  ],
  
})
export class ProductsModule {}
