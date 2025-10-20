import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Observable, Subject, takeUntil } from 'rxjs';

import { TransactionStateService } from '@core/services/transaction-state.service';
import { DateFilter } from '@core/models/transaction.model';

/**
 * Componente para los filtros de fecha
 */
@Component({
  selector: 'app-date-filters',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './date-filters.component.html',
  styleUrls: ['./date-filters.component.scss']
})
export class DateFiltersComponent implements OnInit, OnDestroy {
  activeFilter: DateFilter = 'today';
  
  dateFilterOptions = [
    { value: 'today' as DateFilter, label: 'Hoy' },
    { value: 'week' as DateFilter, label: 'Esta semana' },
    { value: 'october' as DateFilter, label: 'Octubre' }
  ];
  
  private destroy$ = new Subject<void>();

  constructor(private transactionStateService: TransactionStateService) {}

  ngOnInit(): void {
    this.transactionStateService.dateFilter$
      .pipe(takeUntil(this.destroy$))
      .subscribe(filter => {
        this.activeFilter = filter;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Maneja el cambio de filtro de fecha
   * @param filter Nuevo filtro seleccionado
   */
  onDateFilterChange(filter: DateFilter): void {
    this.transactionStateService.setDateFilter(filter);
  }
}
