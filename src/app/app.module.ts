import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyService } from './services/Forex/currency.service';
import { HeaderComponent } from './header/header.component';
import { ConvertorModule } from './convertor/convertor.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ConvertorModule],
  providers: [CurrencyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
