import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PieChartModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit  {
  @Input() data!: Observable<PieChartModule>;
  view: [number, number] = [800, 500];
  
  constructor(private router: Router){}
  
  ngOnInit(): void {
  }
  
  linkToDetails(event: any) {
    event.extra.id ?
      this.router.navigate(['details', event.extra.id])
    :
      this.router.navigate(['/**'])

  }

}
