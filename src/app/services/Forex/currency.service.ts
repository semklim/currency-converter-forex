import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

type CurrencyConvert = {
  base: string;
  amount: number;
  result: {
    [key: string]: number;
    rate: number;
  };
  ms: number;
};

type ResGetPrice = {
  base: string;
  results: {
    [key: string]: number;
  };
  update: string;
  ms: number;
};

type AvailableCurrency = {
  currencies: { [key: string]: string };
  ms: number;
};

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiKey = '7dec0df915-91845759b7-rwki86';

  constructor(private http: HttpClient) {}

  convertFromTo(from: string, to: string, amount: number) {
    const url = `https://api.fastforex.io/convert?from=${from}&to=${to}&amount=${amount}&api_key=${this.apiKey}`;
    return this.http.get<CurrencyConvert>(url);
  }

  getPriceFromAllToOne(from: string, to: string[]) {
    const url = `https://api.fastforex.io/fetch-multi?from=${from}&to=${to.join(',')}&api_key=${this.apiKey}`;
    return this.http.get<ResGetPrice>(url);
  }

  getArrOfAvailableCurrency() {
    const url = `https://api.fastforex.io/currencies?api_key=${this.apiKey}`;
    return this.http.get<AvailableCurrency>(url).pipe(map((el) => Object.keys(el.currencies)));
  }
}
