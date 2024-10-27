import { Component, OnInit } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { Observable, catchError, map, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Olympic } from '../../core/models/Olympic';
import { LineChartModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  public nameOfTheCountry: string = "Name of the country";
  public ParticipationsTitle: string = "Number of entries";
  public MedalsTitle: string = "Total number medals";
  public AthletesTitle: string = "Total number of athletes";
  public numberOfParticipations!: Observable<number | undefined>;
  public numberOfMedals!: Observable<number | undefined>;;
  public numberOfAthletes!: Observable<number | undefined>;;
  public olympicsData$!: Observable<Olympic[]>;
  id!: number;
  public olympicCountryData$!: Observable<Olympic | undefined>;
  public lineChartData$!: Observable<LineChartModule>
  // <{
  //   name: string | undefined;
  //   series: {
  //     name: string;
  //     value: number;
  //   }[] | undefined;
  // }[]>;

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.olympicsData$ = this.olympicService.getOlympics();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.olympicCountryData$ = this.getCountryDataById(this.id);
    this.lineChartData$ = this.formatLineChartData();
    this.numberOfParticipations = this.getNumberOfParticipations();
    this.numberOfMedals = this.getNumberOfMedals();
    this.numberOfAthletes = this.getNumberOfAthletes();
  }

  getCountryDataById(id: number) {
    return this.olympicsData$.pipe(map(value =>
      value.find((country: { id: number; }) => id === country.id)
    ),
      catchError((error, caught) => {
        alert('Error encountered' + error)
        return caught;
      }))
  }

  formatLineChartData() {
    return this.olympicCountryData$.pipe(map(value => (

      [{
        name: value?.country,
        series: value?.participations.map(detail => ({
          name: detail.year.toString(),
          value: detail.medalsCount
        }))
      }]
    )))
  }

  getNumberOfParticipations() {
    return this.olympicCountryData$.pipe(map(value => value?.participations.length),
      catchError((error, caught) => {
        alert('Error encountered' + error)
        return caught;
      }))
  }

  getNumberOfMedals() {
    return this.olympicCountryData$.pipe(map(value => value?.participations.reduce((acc, value) => acc += value.medalsCount, 0),
      catchError((error, caught) => {
        alert('Error encountered' + error)
        return caught;
      })))
  }

  getNumberOfAthletes() {
    return this.olympicCountryData$.pipe(map(value => value?.participations.reduce((acc, value) => acc += value.athleteCount, 0),
    catchError((error, caught) => {
      alert('Error encountered' + error)
      return caught;
    })))
}
}
