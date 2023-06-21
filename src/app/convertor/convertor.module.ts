import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertorComponent } from './convertor.component';
import { InputFieldsComponent } from './input-fields/input-fields.component';

@NgModule({
  declarations: [ConvertorComponent, InputFieldsComponent],
  imports: [CommonModule],
  exports: [ConvertorComponent],
})
export class ConvertorModule {}
