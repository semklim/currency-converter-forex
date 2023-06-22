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

  _inputLeft: ConvertorInputs = {
    input: null,
    selected: null,
    exchangeDir: 'From',
  };

  _inputRight: ConvertorInputs = {
    input: null,
    selected: null,
    exchangeDir: 'To',
  };

  constructor(public currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getArrOfAvailableCurrency().subscribe((res) => (this.availableCurrency = res));
  }

  /* -------------------------------- InputLeft Start ------------------------------- */

  set inputLeft(value: ConvertorInputs) {
    value.input = Number(value.input);
    if (value.input <= 0) {
      value.input = null;
    }
    this._inputLeft = value;
    this.convertByInput(value, this.inputRight, value.input);
  }

  get inputLeft(): ConvertorInputs {
    return this._inputLeft;
  }

  /* ------------------------------- InputRight Start ------------------------------- */

  set inputRight(value: ConvertorInputs) {
    value.input = Number(value.input);
    if (value.input <= 0) {
      value.input = null;
    }
    this._inputRight = value;
    this.convertByInput(value, this.inputLeft, value.input);
  }

  get inputRight(): ConvertorInputs {
    return this._inputRight;
  }

  /* --------------------------- Logic of conversion -------------------------- */

  convertByInput(fromInstance: ConvertorInputs, toInstance: ConvertorInputs, amount: number | null) {
    if (this.validation(amount)) {
      this.inputLeft.input = this.inputRight.input = amount;
      return;
    }

    if (!amount) {
      this.inputLeft.input = this.inputRight.input = null;
      return;
    }

    fromInstance.exchangeDir = 'From';
    toInstance.exchangeDir = 'To';

    this.postData(fromInstance, toInstance, amount);
  }

  convertByCurrencyCod(input: ConvertorInputs) {
    let fromInstance: ConvertorInputs;
    let toInstance: ConvertorInputs;
    let amount = input.input;

    if (input === this.inputLeft) {
      if (input.exchangeDir === 'From') {
        fromInstance = this.inputLeft;
        toInstance = this.inputRight;
      } else {
        fromInstance = this.inputRight;
        amount = Number(this.inputRight.input);
        toInstance = this.inputLeft;
      }
    } else {
      if (input.exchangeDir === 'From') {
        fromInstance = this.inputRight;
        toInstance = this.inputLeft;
      } else {
        fromInstance = this.inputLeft;
        amount = Number(this.inputLeft.input);
        toInstance = this.inputRight;
      }
    }
    if (this.validation(amount)) {
      toInstance.input = fromInstance.input;
      return;
    }
    if (amount) {
      this.postData(fromInstance, toInstance, amount);
    }
  }

  postData(fromInstance: ConvertorInputs, toInstance: ConvertorInputs, amount: number) {
    this.currencyService.convertFromTo(fromInstance.selected!, toInstance.selected!, amount).subscribe((response) => {
      toInstance.input = response.result[toInstance.selected!];
    });
  }

  validation(amount: number | null): boolean {
    return (
      this.inputLeft.selected === this.inputRight.selected ||
      !this.inputLeft.selected ||
      !this.inputRight.selected ||
      Number.isNaN(amount)
    );
  }
}
