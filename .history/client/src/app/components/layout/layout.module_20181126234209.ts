import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutRoutingModule } from '../../components/layout/layout.routing';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    CommonModule,
    LayoutRoutingModule
  ],
  providers: []
})
export class LayoutModule { }
