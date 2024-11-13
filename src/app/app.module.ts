import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { OlympicService } from './core/services/olympic.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { DetailsComponent } from './pages/details/details.component';
import { RouterLink } from '@angular/router';
import { LineChartsComponent } from './components/line-charts/line-charts.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, PieChartComponent, DetailsComponent, LineChartsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgxChartsModule, BrowserAnimationsModule, RouterLink],
  providers: [OlympicService],
  bootstrap: [AppComponent],
})
export class AppModule {}
