import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-names-list',
  template: `
      <ul>
          <li *ngFor="let name of names; let idx = index">
              <button (click)="removeName.emit(idx)">x</button>
              {{ idx + 1 }} of <app-names-count [names]="names"></app-names-count>: {{ name }}
          </li>
      </ul> `,
  styles: []
})
export class NamesListComponent {
  @Input() names: string[] = [];
  @Output() removeName: EventEmitter<number> = new EventEmitter();
}
