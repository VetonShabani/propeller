import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_PRODUCT } from '../graphql/queries/product-queries';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apollo: Apollo) {}

  getProductById(id: number, slug?: string) {
    return this.apollo.query({
      query: GET_PRODUCT,
      variables: {
        id,
        slug,
      },
    });
  }
}
