import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConvertorInputs } from '../convertor.component';

@Component({
  selector: 'app-input-fields',
  templateUrl: './input-fields.component.html',
  styleUrls: ['./input-fields.component.css'],
})
export class InputFieldsComponent {
  @Input() availableCurrency: string[] = [''];

  @Input() data: ConvertorInputs = {
    input: null,
    selected: null,
    exchangeDir: '',
  };

  @Output() dataChange: EventEmitter<ConvertorInputs> = new EventEmitter();

  @Output() selectedChange: EventEmitter<ConvertorInputs> = new EventEmitter();

  private delayEmitId?: ReturnType<typeof setTimeout>;

  fireData() {
    clearTimeout(this.delayEmitId);
    if (!isNaN(this.data.input as number)) {
      this.delayEmitId = setTimeout(() => {
        this.dataChange.emit(this.data);
      }, 50);
    }
  }

  fireSelected() {
    this.selectedChange.emit();
  }
}
