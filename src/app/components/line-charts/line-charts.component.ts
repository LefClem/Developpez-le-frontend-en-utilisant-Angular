import { Component, Input, OnInit } from '@angular/core';
import { LineChartModule } from '@swimlane/ngx-charts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-line-charts',
  templateUrl: './line-charts.component.html',
  styleUrl: './line-charts.component.scss'
})
export class LineChartsComponent implements OnInit{
@Input() data!: Observable<LineChartModule>

xAxisLabel: string = 'Dates';
yAxisLabel: string = 'Number of medals per year'

  ngOnInit(): void {
    
  }

}
