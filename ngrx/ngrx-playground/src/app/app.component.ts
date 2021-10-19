import { Component } from '@angular/core';
import { CounterModel } from './data-modules/counter/counter.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngrx-playground';

  constructor(private counter: CounterModel) { }

  increment() {
    this.counter.increment();
  }

  decrement() {
    this.counter.decrement();
  }
}
