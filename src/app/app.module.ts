import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './material.module';
import { routes } from './routes';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './list/details/details.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProductsModule } from './list/store/product-list.module';

@NgModule({
  declarations: [	
    AppComponent,
    ListComponent,
    DetailsComponent,
      OrderDetailsComponent
   ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    AngularMaterialModule,
    ProductsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
