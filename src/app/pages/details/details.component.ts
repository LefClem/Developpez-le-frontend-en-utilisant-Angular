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
  public olympics$!: Observable<Olympic[]>;
  id!: number;
  public olympicCountryData$!: Observable<Olympic | undefined>;
  public lineChartData$!: Observable<LineChartModule>

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.olympicCountryData$ = this.olympicService.getCountryDataById(this.id);
    this.lineChartData$ = this.olympicService.formatLineChartData(this.olympicCountryData$);
    this.numberOfParticipations = this.olympicService.getNumberOfParticipations(this.olympicCountryData$);
    this.numberOfMedals = this.olympicService.getNumberOfMedals(this.olympicCountryData$);
    this.numberOfAthletes = this.olympicService.getNumberOfAthletes(this.olympicCountryData$);
  }

}
