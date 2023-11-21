import { Component, OnInit, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, Subscription, map } from 'rxjs';
import { GET_PRODUCT_LIST, GET_PRODUCT_LIST_VARIABLES } from '../graphql/queries/product-queries';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { OrderService } from '../services/order.service';
import { Store } from '@ngrx/store';
import { selectFilters, selectInitialFilters, selectSorting } from './store/product-list.selectors';
import { loadInitialFilters, setFilters } from './store/product-list.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  
})
export class ListComponent implements OnInit {

  filters$: Observable<{ category: string; brand: string }>;
  sorting$: Observable<string>;
  selectedSorting: string = '';


  data$!: Subscription;
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  brands: string[] = [];
  selectedCategory: string | null = null;
  selectedBrand: string | null = null;
  pageSizeOptions: number[] = [4, 12, 24, 48, 96];
  pageSize = 12;
  pageIndex = 0;
  pageEvent: PageEvent;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private apollo: Apollo,
    private router: Router,
    private snackbarService: SnackbarService,
    private orderService: OrderService,
    private store: Store
  ) {
    this.filters$ = this.store.select(selectFilters);
    this.sorting$ = this.store.select(selectSorting);
  }

  ngOnInit(): void {
    this.store.dispatch(loadInitialFilters());

    this.store.select(selectInitialFilters).subscribe((initialFilters) => {
      this.selectedCategory = initialFilters.category;
      this.selectedBrand = initialFilters.brand;
      this.selectedSorting = 'initialSortingOption';


    });

    this.data$ = this.apollo
      .watchQuery({
        query: GET_PRODUCT_LIST,  
        variables: GET_PRODUCT_LIST_VARIABLES
      })
      .valueChanges.subscribe((result: any) => {
        this.products = result.data.products.items
        this.filteredProducts = this.products;
        
        this.extractFilters();
        this.applyFilters(this.selectedCategory, this.selectedBrand);
        return result.data.getData;
      })

  }
  extractFilters(): void {
    this.categories = [...new Set(this.products.flatMap((p) => this.extractFacetValues(p, 'category')))];
    this.brands = [...new Set(this.products.flatMap((p) => this.extractFacetValues(p, 'brand')))];
  }

  extractFacetValues(product: any, facetName: string): string[] {
    return product.facetValues
      .filter((facetValue: any) => facetValue.facet.name === facetName)
      .map((facetValue: any) => facetValue.name);
  }

  applyFilters(category: string, brand: string): void {
    this.pageIndex = 0;
    this.store.dispatch(setFilters({ category, brand }));
    this.filteredProducts = this.products.filter(
      (p) =>
        (!category || this.extractFacetValues(p, 'category').includes(category)) &&
        (!brand || this.extractFacetValues(p, 'brand').includes(brand))
    );

    this.paginator.firstPage();
  }


  applyFilters1(category: string, brand: string): void {
    this.selectedCategory = category;
    this.selectedBrand = brand;

    this.filteredProducts = this.products.filter((product) => {
      const categoryMatch = !category || product.facetValues.some(fv => fv.name === category);
      const brandMatch = !brand || product.facetValues.some(fv => fv.name === brand);

      return categoryMatch && brandMatch;
    });

    this.pageIndex = 0;
  }

  resetFilters(): void {
    this.pageIndex = 0;
    this.selectedBrand = null
    this.selectedCategory = null
    this.filteredProducts = this.products;
    this.paginator.firstPage();
  }
  addToCart(productId: string): void {
    this.orderService.addToOrder(productId);
    this.snackbarService.showSuccess('Product added to cart!');
  }
  goToOrderDetails(): void {
    this.router.navigate(['order-details']);
  }
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
  }
  pagedProducts(): any[] {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredProducts.slice(startIndex, endIndex);
  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
  navigateToDetails(productId: string): void {
    this.router.navigate(['details', productId]);
  }
}
