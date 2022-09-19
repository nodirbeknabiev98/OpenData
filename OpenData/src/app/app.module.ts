import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { appRoutes } from '../routes';

import { AppRoutingModule } from './app-routing.module';
import { NgChartsModule } from 'ng2-charts';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { SectionSalesComponent } from './Components/Sections/section-sales/section-sales.component';
import { SectionOrdersComponent } from './Components/Sections/section-orders/section-orders.component';
import { SectionServersComponent } from './Components/Sections/section-servers/section-server.component';
import { BarChartComponent } from './Components/Charts/bar-chart/bar-chart.component';
import { PieChartComponent } from './Components/Charts/pie-chart/pie-chart.component';
import { DoughnutChartComponent } from './Components/Charts/doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from './Components/Charts/line-chart/line-chart.component';
import { ServerComponent } from './Components/server/server.component';
import { PaginationComponent } from './Components/pagination/pagination.component';

import { SalesDataService } from './Services/SalesData/sales-data.service';
import { ServerService } from './Services/Server/server.service';
import { LineChartService } from './Services/LineChart/linechart.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    SectionSalesComponent,
    SectionOrdersComponent,
    SectionServersComponent,
    BarChartComponent,
    PieChartComponent,
    DoughnutChartComponent,
    LineChartComponent,
    ServerComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    NgChartsModule,
    HttpClientModule
  ],
  providers: [SalesDataService,ServerService,LineChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
