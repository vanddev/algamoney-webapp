import { FormControl } from '@angular/forms';
import { Input, Component } from '@angular/core';

@Component({
  selector: 'app-valid-message',
  template: `
    <div *ngIf="temErro()" class="ui-message ui-messages-error ui-corner-all">
      {{ text }}
    </div>
  `,
  styles: [`
    .ui-messages-error{
      margin: 0;
      margin-top: 4px;
    }
  `]
})
export class ValidMessageComponent {

  @Input() error: string;
  @Input() control: FormControl;
  @Input() text: string;
  @Input() eventTouched: boolean;

  temErro(): boolean {
    return this.control.hasError(this.error)  && (this.eventTouched !== false ? this.control.touched : this.control.dirty);
  }
}
