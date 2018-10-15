import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatSliderModule,
} from '@angular/material';

@NgModule({
  exports: [MatButtonModule, MatIconModule, MatSliderModule],
})
export class MaterialModule {}
