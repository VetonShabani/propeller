import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListComponent } from './/list/list.component';
import { DetailsComponent } from './list/details/details.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

export const routes: Routes = [
    { path: 'home', component: AppComponent },
    { path: 'list', component: ListComponent },
    { path: 'details/:productId', component: DetailsComponent },
    { path: 'order-details', component: OrderDetailsComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];