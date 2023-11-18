import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { GET_PRODUCT_LIST, GET_PRODUCT_LIST_VARIABLES } from '../graphql/queries/product-queries';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  data$!: Observable<any>;
  data: any;
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.data$ = this.apollo
      .watchQuery({
        query: GET_PRODUCT_LIST, // path to your GraphQL query file
        variables: GET_PRODUCT_LIST_VARIABLES
      })
      .valueChanges.pipe(
        map((result: any) => {
          this.data = result
          console.log(this.data);
          // if (result.errors) {
          //   console.error(result.errors); // Log errors
          // }
          return result.data.getData;
        })
      );
  }

}
