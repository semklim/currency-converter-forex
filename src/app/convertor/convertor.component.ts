import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/Forex/currency.service';

export type ConvertorInputs = {
  input: number;
  selected: string;
};

@Component({
  selector: 'app-convertor',
  templateUrl: './convertor.component.html',
  styleUrls: ['./convertor.component.css'],
})
export class ConvertorComponent implements OnInit {
  availableCurrency: string[] = [''];

  inputLeft: ConvertorInputs = {
    input: 1,
    selected: 'USD',
  };

  inputRight: ConvertorInputs = {
    input: 1,
    selected: 'USD',
  };

  constructor(public currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getArrOfAvailableCurrency().subscribe((res) => (this.availableCurrency = res));
  }

  convert(input: ConvertorInputs) {
    if (this.isNaNCheck(input)) {
      this.inputLeft.input = this.inputRight.input = input.input;
      return;
    }
    let fromInstance: ConvertorInputs;
    let toInstance: ConvertorInputs;
    let amount: number;

    if (input === this.inputLeft) {
      amount = Number(this.inputLeft.input);
      fromInstance = this.inputLeft;
      toInstance = this.inputRight;
    } else {
      amount = Number(this.inputRight.input);
      fromInstance = this.inputRight;
      toInstance = this.inputLeft;
    }

    this.currencyService.convertFromTo(fromInstance.selected, toInstance.selected, amount).subscribe((response) => {
      fromInstance = {
        input: amount,
        selected: response.base,
      };
      toInstance.input = response.result[toInstance.selected];
    });
  }

  isNaNCheck(input: ConvertorInputs): boolean {
    const amount = Number(input.input);
    return this.inputLeft.selected === this.inputRight.selected || !input.input || Number.isNaN(amount);
  }
}
