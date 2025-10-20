import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, takeUntil } from 'rxjs';

import { TransactionStateService } from '@core/services/transaction-state.service';
import { Transaction } from '@core/models/transaction.model';
import { CurrencyColombiaPipe } from '@shared/pipes/currency-colombia.pipe';
import { DateFormatPipe } from '@shared/pipes/date-format.pipe';
import { PaymentMethodIconPipe } from '@shared/pipes/payment-method-icon.pipe';
import { StatusIconPipe } from '@shared/pipes/status-icon.pipe';

@Component({
  selector: 'app-transactions-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CurrencyColombiaPipe,
    DateFormatPipe,
    PaymentMethodIconPipe,
    StatusIconPipe
  ],
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent implements OnInit, OnDestroy {
  transactions: Transaction[] = [];
  loading = false;
  error: string | null = null;
  selectedTransaction: Transaction | null = null;
  showDetailPanel = false;
  
  displayedColumns = ['transaction', 'date', 'paymentMethod', 'reference', 'amount'];
  
  private destroy$ = new Subject<void>();

  constructor(private transactionStateService: TransactionStateService) {}

  ngOnInit(): void {
    this.subscribeToData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToData(): void {
    this.transactionStateService.filteredTransactions$
      .pipe(takeUntil(this.destroy$))
      .subscribe(transactions => {
        this.transactions = transactions;
      });

    this.transactionStateService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.loading = loading;
      });

    this.transactionStateService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe(error => {
        this.error = error;
      });
  }

  onRowClick(transaction: Transaction): void {
    this.selectedTransaction = transaction;
    this.transactionStateService.selectTransaction(transaction);
  }

  hasDeduction(transaction: Transaction): boolean {
    return transaction.deduction !== undefined && transaction.deduction !== null && transaction.deduction > 0;
  }
}
