import { Component, signal } from '@angular/core';
import { Sidebar } from "./shared/sidebar/sidebar";

@Component({
  selector: 'app-root',
  imports: [ Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('countriesApp');
}
