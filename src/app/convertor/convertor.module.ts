import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertorComponent } from './convertor.component';
import { InputFieldsComponent } from './input-fields/input-fields.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ConvertorComponent, InputFieldsComponent],
  imports: [CommonModule, FormsModule],
  exports: [ConvertorComponent],
})
export class ConvertorModule {}
