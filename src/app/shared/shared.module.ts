import { ValidMessageComponent } from './valid-message/valid-message.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ValidMessageComponent
  ],
  exports: [
    ValidMessageComponent
  ]
})
export class SharedModule { }
