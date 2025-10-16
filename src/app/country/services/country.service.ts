import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { Capital } from '../interfaces/capital.interface';
import { Region } from '../interfaces/region.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  httpParams = new HttpParams()
    .set('fields', 'name,capital,population,flags,cca2,region');

  seeParams = new HttpParams()
    .set('fields', 'name,flags,population,translations,ccn3,car')
    
  private COUNTRY_URL = 'https://restcountries.com/v3.1';
  private CAPITAL_URL = 'https://restcountries.com/v3.1/capital';
  private REGION_URL = 'https://restcountries.com/v3.1/region';

  constructor(private http: HttpClient) { }

  searchCountry(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.COUNTRY_URL}/name/${term}`, { params: this.httpParams });
  }
  searchCapital(term: string): Observable<Capital[]> {
    return this.http.get<Capital[]>(`${this.CAPITAL_URL}/${term}`, { params: this.httpParams });
  }
  searchRegion(term: string): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.REGION_URL}/${term}`, {params: this.httpParams});
  }
  getCountryByAlpha(id: string): Observable<Country> {
    return this.http.get<Country>(`${this.COUNTRY_URL}/alpha/${id}`, {params: this.seeParams});
  }
}
