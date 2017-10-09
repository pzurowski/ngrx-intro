import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-names-description',
  template: `<strong>{{ description }}</strong>`,
})
export class NamesDescriptionComponent {
  @Input() description
}
