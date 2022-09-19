import {Routes} from '@angular/router';
import { SectionSalesComponent } from './app/Components/Sections/section-sales/section-sales.component';
import { SectionOrdersComponent } from './app/Components/Sections/section-orders/section-orders.component';
import { SectionServersComponent } from './app/Components/Sections/section-servers/section-server.component';

export const appRoutes : Routes = [
    {path: 'sales', component: SectionSalesComponent},
    {path: 'orders', component: SectionOrdersComponent},
    {path: 'servers', component: SectionServersComponent},
    {path: '', redirectTo: '/sales', pathMatch: 'full'},
];

