import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductListState } from './product-list.reducers';

export const selectProductListState = createFeatureSelector<ProductListState>('productList');

export const selectFilters = createSelector(selectProductListState, (state) => state.filters);
export const selectSorting = createSelector(selectProductListState, (state) => state.sortBy);

export const selectInitialFilters = createSelector(selectFilters, (filters) => filters);
