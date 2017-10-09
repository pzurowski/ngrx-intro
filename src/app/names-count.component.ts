import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-names-count',
  template: `<em>({{ names.length }})</em>`,
})
export class NamesCountComponent {
  @Input() names: string[] = [];
}
