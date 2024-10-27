import { Component, OnInit } from '@angular/core';
import { PieChartModule } from '@swimlane/ngx-charts';
import { Observable, map } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$!: Observable<Olympic[]>;
  public olympic: string = "Medals per Country";
  public pieChartData$!: Observable<PieChartModule>;
  public numberOfOlympicsGames!: Observable<number>;
  public numberOfCountries!: Observable<number>;

  constructor(private olympicService: OlympicService) {}
  
  ngOnInit(): void {    
    this.olympics$ = this.olympicService.getOlympics();
    this.pieChartData$ = this.formatPieChartData();
    this.numberOfOlympicsGames = this.getNumberOfOlympics();  
    this.numberOfCountries = this.getNumberOfCountries();
  }
  
  getNumberOfOlympics() {
    return this.olympics$.pipe(
      map(value => value.map(olympic => olympic.participations.length).reduce((acc, val) => acc += val, 0))
    )
  }

  getNumberOfCountries() {
    return this.olympics$.pipe(
      map(value => value.length)
    )
  }
  
  formatPieChartData(){
    return this.olympics$.pipe(
      map(value => 
        value.map(olympic => ({
          name: olympic.country,
          value: olympic.participations.reduce((acc, val) => acc += val.medalsCount, 0),
          extra: { id: olympic.id }
        }))
    ))
  }
}