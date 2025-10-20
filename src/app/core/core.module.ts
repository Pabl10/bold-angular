import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TransactionApiService } from './services/transaction-api.service';
import { TransactionStateService } from './services/transaction-state.service';
import { FilterService } from './services/filter.service';

/**
 * Módulo core que contiene servicios singleton
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    TransactionApiService,
    TransactionStateService,
    FilterService
  ]
})
export class CoreModule { }
