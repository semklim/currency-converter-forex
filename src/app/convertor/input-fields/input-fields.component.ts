import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConvertorInputs } from '../convertor.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-input-fields',
  templateUrl: './input-fields.component.html',
  styleUrls: ['./input-fields.component.css'],
})
export class InputFieldsComponent implements OnInit {
  @Input() availableCurrency$?: Observable<{ [key: string]: string }>;

  @Input() data: ConvertorInputs = {
    input: null,
    selected: null,
    exchangeDir: '',
  };

  @Output() dataChange: EventEmitter<ConvertorInputs> = new EventEmitter();

  @Output() selectedChange: EventEmitter<ConvertorInputs> = new EventEmitter();

  arrOfAvailableCurrency: string[] = [''];

  availableCurrency: { [key: string]: string } = { USD: 'USD' };

  private delayEmitId?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.availableCurrency$?.subscribe((res) => {
      this.arrOfAvailableCurrency = Object.keys(res);
      this.availableCurrency = res;
    });
  }

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
