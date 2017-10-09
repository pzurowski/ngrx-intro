import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {NamesService} from './names.redux';

@Component({
  selector: 'app-root',
  template: `
      <app-names-description [description]="description$ | async"></app-names-description>
      <app-names-list [names]="names$ | async"
                      (removeName)="remove($event)"></app-names-list>
      <app-names-count [names]="names$ | async"></app-names-count>
      <pre>{{ names$ | async | json }}</pre>

      <input #name/>
      <button (click)="add(name.value)">add</button>
      <br/>
      <button (click)="sort()">sort</button>
      <button (click)="reset()">reset</button>
      <button (click)="newDescription()">new description</button>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  names$: Observable<string[]>;
  description$: Observable<string>;

  constructor(private namesService: NamesService) {
    this.names$ = namesService.names$;
    this.description$ = namesService.description$;
  }

  ngOnInit(): void {
    this.namesService.fetchDescription();
  }

  add(name) {
    this.namesService.add(name);
  }

  reset() {
    this.namesService.reset();
  }

  sort() {
    this.namesService.sort();
  }

  remove(i: number) {
    this.namesService.remove(i);
  }

  newDescription() {
    this.namesService.fetchDescription();
  }
}
