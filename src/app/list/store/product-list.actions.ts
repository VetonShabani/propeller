import { createAction, props } from '@ngrx/store';
export const loadInitialFilters = createAction('[Product List] Load Initial Filters');
export const setFilters = createAction('[Product List] Set Filters', props<{ category: string; brand: string }>());
export const setSorting = createAction('[Product List] Set Sorting', props<{ sortBy: string }>());
