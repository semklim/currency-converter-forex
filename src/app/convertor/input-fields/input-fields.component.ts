import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConvertorInputs } from '../convertor.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-input-fields',
  templateUrl: './input-fields.component.html',
  styleUrls: ['./input-fields.component.css'],
})
export class InputFieldsComponent {
  @Input() availableCurrency: string[] = [''];

  @Input() data: ConvertorInputs = {
    input: 0,
    selected: '',
  };

  @Output() dataChange: EventEmitter<ConvertorInputs> = new EventEmitter();

  private delayEmitId?: ReturnType<typeof setTimeout>;

  fireData() {
    clearTimeout(this.delayEmitId);
    if (this.data.selected) {
      this.delayEmitId = setTimeout(() => {
        this.dataChange.emit(this.data);
      }, 100);
    }
  }
}
