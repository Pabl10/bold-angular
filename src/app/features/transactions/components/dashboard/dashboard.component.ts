import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';

import { Transaction } from '@core/models/transaction.model';
import { TransactionApiService } from '@core/services/transaction-api.service';
import { TransactionStateService } from '@core/services/transaction-state.service';

import { SalesCardComponent } from '../sales-card/sales-card.component';
import { DateFiltersComponent } from '../date-filters/date-filters.component';
import { FilterButtonComponent } from '../filter-button/filter-button.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { TransactionsTableComponent } from '../transactions-table/transactions-table.component';
import { TransactionDetailModalComponent } from '../transaction-detail-modal/transaction-detail-modal.component';

/**
 * Componente principal del dashboard de transacciones
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SalesCardComponent,
    DateFiltersComponent,
    FilterButtonComponent,
    SearchBarComponent,
    TransactionsTableComponent,
    TransactionDetailModalComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private transactionApiService: TransactionApiService,
    private transactionStateService: TransactionStateService
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Carga las transacciones desde la API
   */
  private loadTransactions(): void {
    this.transactionStateService.setLoading(true);
    
    this.transactionApiService.getTransactions()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (transactions) => {
          this.transactionStateService.setTransactions(transactions);
        },
        error: (error) => {
          console.error('Error al cargar transacciones:', error);
          this.transactionStateService.setError('Error al cargar las transacciones. Intenta nuevamente.');
        }
      });
  }
}
