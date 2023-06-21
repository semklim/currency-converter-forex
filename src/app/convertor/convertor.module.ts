import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertorComponent } from './convertor.component';
import { InputFieldsComponent } from './input-fields/input-fields.component';
import { FormsModule } from '@angular/forms';
// eslint-disable-next-line import/no-extraneous-dependencies
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [ConvertorComponent, InputFieldsComponent],
  imports: [CommonModule, FormsModule, NgSelectModule],
  exports: [ConvertorComponent],
})
export class ConvertorModule {}
