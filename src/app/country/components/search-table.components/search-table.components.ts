import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Country } from '../../interfaces/country.interface';
import { debounceTime, Subject } from 'rxjs';
import { Capital } from '../../interfaces/capital.interface';
import { SignalNode } from '@angular/core/primitives/signals';
import { Region } from '../../interfaces/region.interface';

@Component({
  selector: 'app-search-table',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search-table.components.html',
  styleUrl: './search-table.components.css'
})
export class SearchTableComponents implements OnInit {



  term = signal<string>('');
  debouncer: Subject<string> = new Subject();

  @Output() onSearch: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  @Input() title:string = 'Search';
  @Input() countries!: Signal<Country[]| Capital[]| Region[]>;
  @Input() loading!: Signal<boolean>;

  ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime(700)
      )
      .subscribe(res => this.onDebounce.emit(res));
  }
  search() {
    this.onSearch.emit(this.term());
  }
  keyPressed() {
    this.debouncer.next(this.term())
  }
}
