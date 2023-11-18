import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListComponent } from './/list/list.component';

export const routes: Routes = [
    { path: 'home', component: AppComponent },
    { path: 'list', component: ListComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];