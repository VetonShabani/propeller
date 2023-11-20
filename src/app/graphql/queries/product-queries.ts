import { gql } from 'apollo-angular';

export const GET_PRODUCT_LIST = gql`
query GetProductList($options: ProductListOptions) {
  products(options: $options) {
    totalItems
    items {
      id
      name
      slug
      assets {source}
      facetValues { name facet { name} }
      collections { name description}
      description
      translations { languageCode}
    }
  }
}
`;
export const GET_PRODUCT = gql`
query GetProduct($id: ID!) {
  product(id: $id) {
    id
    name
    slug
    assets {source width height}
    facetValues { facet { name} }
    collections { name }
    description
  }
}
`;

export const GET_PRODUCT_LIST_VARIABLES = {
  options: {
    skip: 0,
    take: 58
  }
};
