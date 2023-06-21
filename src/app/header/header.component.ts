import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CurrencyService } from '../services/Forex/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  currentPricesUAH$?: Observable<[string, number][]>;

  constructor(private currencyService: CurrencyService) {
    this.currentPricesUAH$ = this.getPriceUAHtoALL(['USD', 'EUR']);
  }

  getPriceUAHtoALL(currencyCode: string[]) {
    return this.currencyService
      .getPriceFromAllToOne('UAH', currencyCode)
      .pipe(map((res) => Object.entries(res.results)));
  }
}
