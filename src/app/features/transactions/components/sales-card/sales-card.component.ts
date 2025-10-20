import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable, Subject, takeUntil, combineLatest } from 'rxjs';

import { TransactionStateService } from '@core/services/transaction-state.service';
import { CurrencyColombiaPipe } from '@shared/pipes/currency-colombia.pipe';
import { DateFormatPipe } from '@shared/pipes/date-format.pipe';

/**
 * Componente que muestra el total de ventas según los filtros aplicados
 */
@Component({
  selector: 'app-sales-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    CurrencyColombiaPipe,
    DateFormatPipe
  ],
  templateUrl: './sales-card.component.html',
  styleUrls: ['./sales-card.component.scss']
})
export class SalesCardComponent implements OnInit, OnDestroy {
  totalAmount = 0;
  transactionCount = 0;
  periodDescription = '';
  
  private destroy$ = new Subject<void>();

  constructor(private transactionStateService: TransactionStateService) {}

  ngOnInit(): void {
    this.subscribeToData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Suscribe a los datos del estado
   */
  private subscribeToData(): void {
    combineLatest([
      this.transactionStateService.totalAmount$,
      this.transactionStateService.filteredTransactions$,
      this.transactionStateService.dateFilter$
    ])
    .pipe(takeUntil(this.destroy$))
    .subscribe(([totalAmount, transactions, dateFilter]) => {
      this.totalAmount = totalAmount;
      this.transactionCount = transactions.length;
      this.periodDescription = this.getPeriodDescription(dateFilter);
    });
  }

  /**
   * Obtiene la descripción del período según el filtro
   * @param dateFilter Filtro de fecha activo
   * @returns Descripción del período
   */
  private getPeriodDescription(dateFilter: string): string {
    const descriptions: Record<string, string> = {
      'today': 'Hoy',
      'week': 'Esta semana',
      'october': 'Octubre 2024'
    };
    
    return descriptions[dateFilter] || 'Período seleccionado';
  }
}
