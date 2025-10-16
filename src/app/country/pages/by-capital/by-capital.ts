import { Component, inject, signal } from '@angular/core';
import { SearchTableComponents } from "../../components/search-table.components/search-table.components";
import { CountryService } from '../../services/country.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { Capital } from '../../interfaces/capital.interface';
import { catchError, finalize, of, tap } from 'rxjs';

@Component({
  selector: 'app-by-capital',
  imports: [SearchTableComponents],
  templateUrl: './by-capital.html',
  styleUrl: './by-capital.css'
})
export class ByCapital {
  private readonly http = inject(CountryService);
  private readonly toast = inject(HotToastService);

  term = signal<string>('');
  loading = signal<boolean>(false);
  capitals = signal<Capital[]>([]);

  search(term: string) {
    this.term.set(term);
    const termValue = this.term().trim();
    if (!termValue) {
      this.toast.warning('Please enter a capital name');
      return;
    }
    this.loading.set(true);
    this.http.searchCapital(this.term())
      .pipe(
        tap((res) => {
          this.capitals.set(res);
          this.toast.success(`Found ${res.length} result(s) for "${termValue}"`);
        }),
        catchError((err) => {
          this.capitals.set([]);
          this.toast.error(`No results found for "${this.term()}"`);
          return of([]);
        }),
        finalize(() => {
          this.loading.set(false);
        }
        )
      ).subscribe();
  }

}
