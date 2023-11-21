import { createReducer, on } from '@ngrx/store';
import { loadInitialFilters, setFilters, setSorting } from './product-list.actions';

export interface ProductListState {
  filters: { category: string; brand: string };
  sortBy: string;
}

export const initialState: ProductListState = {
  filters: { category: '', brand: '' },
  sortBy: 'name', 
};

export const productListReducer = createReducer(
  initialState,
  on(setFilters, (state, { category, brand }) => ({ ...state, filters: { category, brand } })),
  on(setSorting, (state, { sortBy }) => ({ ...state, sortBy })),
  on(loadInitialFilters, (state) => state) 
);
