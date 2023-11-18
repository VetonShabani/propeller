import { gql } from 'apollo-angular';

export const GET_PRODUCT_LIST = gql`
  query GetProductList($options: ProductListOptions) {
    products(options: $options) {
      totalItems
      items {
        name
      }
    }
  }
`;

export const GET_PRODUCT_LIST_VARIABLES = {
  options: {
    skip: 0,
    take: 55
  }
};
