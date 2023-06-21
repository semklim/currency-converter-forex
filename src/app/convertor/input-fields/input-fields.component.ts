import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConvertorInputs } from '../convertor.component';

@Component({
  selector: 'app-input-fields',
  templateUrl: './input-fields.component.html',
  styleUrls: ['./input-fields.component.css'],
})
export class InputFieldsComponent {
  @Input() availableCurrency: string[] = ['USD', 'EUR', 'UAH'];

  @Input() data: ConvertorInputs = {
    input: 0,
    selected: '',
  };

  @Output() dataChange: EventEmitter<ConvertorInputs> = new EventEmitter();

  private delayEmitId?: ReturnType<typeof setTimeout>;

  fireData() {
    clearTimeout(this.delayEmitId);

    this.delayEmitId = setTimeout(() => {
      this.dataChange.emit(this.data);
    }, 100);
  }
}
