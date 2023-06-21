import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CurrencyService } from '../services/Forex/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  currentPrices$?: Observable<[string, number][]>;

  constructor(private currencySevice: CurrencyService) {
    // this.USD$ = this.getExchangeRateFromUAHto('usd');
    this.currentPrices$ = this.getPriceUAHtoALL(['USD', 'EUR']);
  }

  getExchangeRateFromUAHto(currencyCode: string) {
    return this.currencySevice.convertFromTo(currencyCode, 'UAH', 1).pipe(map((res) => res.result['UAH']));
  }

  getPriceUAHtoALL(currencyCode: string[]) {
    return this.currencySevice
      .getPriceFromAllToOne('UAH', currencyCode)
      .pipe(map((res) => Object.entries(res.results)));
  }
}
