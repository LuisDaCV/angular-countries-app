import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { switchMap, tap, pipe, catchError, of } from 'rxjs';
import { Country } from '../../interfaces/country.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-see-country',
  imports: [CommonModule],
  templateUrl: './see-country.html',
  styleUrl: './see-country.css'
})
export class SeeCountry implements OnInit {

  activateRoute = inject(ActivatedRoute);
  http = inject(CountryService);
  router = inject(Router);

  country!: Country;

  ngOnInit(): void {

    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.http.getCountryByAlpha(id).pipe(
          catchError(() => {
            this.router.navigate(['/']);
            return of(null);
          })
        )),
        tap(console.log)
      )
      .subscribe(country => {
        if(!country) return;
        this.country = country[0];
      })

  }

}
