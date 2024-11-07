import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.olympics$.next(value);
        }),
      catchError((error, caught) => {
        alert('Error encountered' + error)
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
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

  getCountryDataById(id: number) {
    return this.olympics$.pipe(map(value =>
      value.find((country: { id: number; }) => id === country.id)
    ),
      catchError((error, caught) => {
        alert('Error encountered' + error)
        return caught;
      }))
  }

  getNumberOfParticipations(countryData$: Observable<Olympic | undefined>) {
    return countryData$.pipe(map(value => value?.participations.length),
      catchError((error, caught) => {
        alert('Error encountered' + error)
        return caught;
      }))
  }

  formatLineChartData(countryData$: Observable<Olympic | undefined>) {
    return countryData$.pipe(map(value => (

      [{
        name: value?.country,
        series: value?.participations.map(detail => ({
          name: detail.year.toString(),
          value: detail.medalsCount
        }))
      }]
    )))
  }

  getNumberOfMedals(countryData$: Observable<Olympic | undefined>) {
    return countryData$.pipe(map(value => value?.participations.reduce((acc, value) => acc += value.medalsCount, 0),
      catchError((error, caught) => {
        alert('Error encountered' + error)
        return caught;
      })))
  }

  getNumberOfAthletes(countryData$: Observable<Olympic | undefined>) {
    return countryData$.pipe(map(value => value?.participations.reduce((acc, value) => acc += value.athleteCount, 0),
    catchError((error, caught) => {
      alert('Error encountered' + error)
      return caught;
    })))
}
}

