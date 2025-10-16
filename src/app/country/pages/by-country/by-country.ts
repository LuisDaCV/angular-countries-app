import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryService } from '../../services/country.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { catchError, finalize, of, tap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';
import { RouterModule } from '@angular/router';
import { SearchTableComponents } from "../../components/search-table.components/search-table.components";

@Component({
  selector: 'app-by-country',
  imports: [CommonModule, FormsModule, RouterModule, SearchTableComponents],
  templateUrl: './by-country.html',
  styleUrl: './by-country.css'
})
export class ByCountry {

  private readonly countryService = inject(CountryService);
  private readonly toast = inject(HotToastService);

  term = signal<string>('');
  countries = signal<Country[]>([]);
  loading = signal<boolean>(false);

  search (term: string) {
    this.term.set(term);
    const termValue = this.term().trim();
    if (!termValue) {
      this.toast.warning('Please enter a country name');
      return;
    }
    this.loading.set(true);

    this.countryService.searchCountry(this.term())
      .pipe(
        tap((res) => {
          this.countries.set(res);
          this.toast.success(`Found ${res.length} result(s) for "${termValue}"`);
        }),
        catchError((err) => {
          this.countries.set([])
          this.toast.error(`No results found for "${this.term()}"`);
          return of([]);
        }),
        finalize(() => {
          this.loading.set(false);
        })
      ).subscribe();
  }

}
