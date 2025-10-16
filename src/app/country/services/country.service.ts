import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { Capital } from '../interfaces/capital.interface';
import { Region } from '../interfaces/region.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private COUNTRY_URL = 'https://restcountries.com/v3.1';
  private CAPITAL_URL = 'https://restcountries.com/v3.1/capital';
  private REGION_URL = 'https://restcountries.com/v3.1/region';

  constructor(private http: HttpClient) { }

  searchCountry(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.COUNTRY_URL}/name/${term}`);
  }
  searchCapital(term: string): Observable<Capital[]> {
    return this.http.get<Capital[]>(`${this.CAPITAL_URL}/${term}`);
  }
  searchRegion(term: string): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.REGION_URL}/${term}`);
  }
  getCountryByAlpha(id: string):Observable<Country> {
    return this.http.get<Country>(`${this.COUNTRY_URL}/alpha/${id}`);
  }
}
