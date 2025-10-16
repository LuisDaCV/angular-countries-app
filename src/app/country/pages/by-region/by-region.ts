import { Component, inject, signal } from '@angular/core';
import { SearchTableComponents } from "../../components/search-table.components/search-table.components";
import { CountryService } from '../../services/country.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { Region } from '../../interfaces/region.interface';
import { catchError, finalize, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-by-region',
  imports: [SearchTableComponents, CommonModule],
  templateUrl: './by-region.html',
  styleUrl: './by-region.css'
})
export class ByRegion {

  private readonly http = inject(CountryService);
  private readonly toast = inject(HotToastService);

  regionsRest: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  activeRegion = signal<string>('');


  term = signal<string>('');
  loading = signal<boolean>(false);
  regions = signal<Region[]>([]);


  search(term: string) {
    this.term.set(term);
    const termValue = this.term().trim();
    if (!termValue) {
      this.toast.warning('Please enter a region name');
      return;
    }
    this.loading.set(true);
    this.http.searchRegion(this.term())
      .pipe(
        tap((res) => {
          this.regions.set(res);
          this.toast.success(`Found ${res.length} result(s) for "${termValue}"`);
        }),
        catchError((err) => {
          this.regions.set([]);
          this.toast.error(`No results found for "${this.term()}"`);
          return of([]);
        }),
        finalize(() => {
          this.loading.set(false);
        })
      ).subscribe();
  }
  searchByRegion(region: string){
    this.activeRegion.set(region);
    this.http.searchRegion(region).subscribe(res => this.regions.set(res));

  }

}
