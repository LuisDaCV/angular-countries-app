import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Country } from '../../interfaces/country.interface';
import { debounceTime, Subject } from 'rxjs';
import { Capital } from '../../interfaces/capital.interface';
import { SignalNode } from '@angular/core/primitives/signals';
import { Region } from '../../interfaces/region.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-search-table',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search-table.components.html',
  styleUrl: './search-table.components.css'
})
export class SearchTableComponents implements OnInit {


  http = inject(CountryService);

  term = signal<string>('');
  debouncer: Subject<string> = new Subject();
  suggested: Country[] | Capital[] = [];

  @Output() onSearch: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  @Input() title: string = 'Search';
  @Input() countries!: Signal<Country[] | Capital[] | Region[]>;
  @Input() loading!: Signal<boolean>;

  ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime(700)
      )
      .subscribe(res => {
        this.onDebounce.emit(res);
        this.suggestions(res);
      });
  }
  search() {
    this.onSearch.emit(this.term());
    this.suggested = []
  }
  keyPressed() {
    this.debouncer.next(this.term());
  }

  suggestions(term: string) {
    if (this.title === 'Country') {
      this.http.searchCountry(term).subscribe(res => this.suggested = res.splice(0,5), (error )=> this.suggested = []);
    }
    else if (this.title === 'Capital') {
      this.http.searchCapital(term).subscribe(res => this.suggested = res);
    }
  }

}
