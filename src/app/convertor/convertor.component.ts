import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/Forex/currency.service';

export type ConvertorInputs = {
  input: number | null;
  selected: string | null;
  exchangeDir: string;
};

@Component({
  selector: 'app-convertor',
  templateUrl: './convertor.component.html',
  styleUrls: ['./convertor.component.css'],
})
export class ConvertorComponent implements OnInit {
  availableCurrency: string[] = [''];

  inputLeft: ConvertorInputs = {
    input: null,
    selected: null,
    exchangeDir: 'From',
  };

  inputRight: ConvertorInputs = {
    input: null,
    selected: null,
    exchangeDir: 'To',
  };

  constructor(public currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getArrOfAvailableCurrency().subscribe((res) => (this.availableCurrency = res));
  }

  convertByInput(input: ConvertorInputs) {
    if (this.validation(input)) {
      this.inputLeft.input = this.inputRight.input = input.input;
      return;
    }

    if (!input.input && (Number(this.inputLeft.input) === 0 || Number(this.inputRight.input) === 0)) {
      this.inputLeft.input = this.inputRight.input = null;
      return;
    }

    let fromInstance: ConvertorInputs;
    let toInstance: ConvertorInputs;
    let amount: number;

    if (input === this.inputLeft) {
      this.inputLeft.input = amount = Number(this.inputLeft.input);
      fromInstance = this.inputLeft;
      toInstance = this.inputRight;
    } else {
      this.inputRight.input = amount = Number(this.inputRight.input);
      fromInstance = this.inputRight;
      toInstance = this.inputLeft;
    }

    fromInstance.exchangeDir = 'From';
    toInstance.exchangeDir = 'To';

    this.postData(fromInstance, toInstance, amount);
  }

  convertByCurrencyCod(input: ConvertorInputs) {
    let fromInstance: ConvertorInputs;
    let toInstance: ConvertorInputs;
    let amount: number;

    if (input === this.inputLeft) {
      if (this.inputLeft.exchangeDir === 'From') {
        fromInstance = this.inputLeft;
        amount = Number(this.inputLeft.input);
        toInstance = this.inputRight;
      } else {
        fromInstance = this.inputRight;
        amount = Number(this.inputRight.input);
        toInstance = this.inputLeft;
      }
    } else {
      if (this.inputRight.exchangeDir === 'From') {
        fromInstance = this.inputRight;
        amount = Number(this.inputRight.input);
        toInstance = this.inputLeft;
      } else {
        fromInstance = this.inputLeft;
        amount = Number(this.inputLeft.input);
        toInstance = this.inputRight;
      }
    }
    if (this.validation(input)) {
      toInstance.input = fromInstance.input;
      return;
    }

    this.postData(fromInstance, toInstance, amount);
  }

  postData(fromInstance: ConvertorInputs, toInstance: ConvertorInputs, amount: number) {
    if (Number(fromInstance.input) <= 0) {
      return;
    }
    this.currencyService.convertFromTo(fromInstance.selected!, toInstance.selected!, amount).subscribe((response) => {
      toInstance.input = response.result[toInstance.selected!];
    });
  }

  validation(input: ConvertorInputs): boolean {
    const amount = Number(input.input);
    return (
      this.inputLeft.selected === this.inputRight.selected ||
      !this.inputLeft.selected ||
      !this.inputRight.selected ||
      Number.isNaN(amount)
    );
  }
}
