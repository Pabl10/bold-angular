import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';

import { TransactionStateService } from '@core/services/transaction-state.service';
import { Transaction } from '@core/models/transaction.model';
import { CurrencyColombiaPipe } from '@shared/pipes/currency-colombia.pipe';
import { DateFormatPipe } from '@shared/pipes/date-format.pipe';
import { PaymentMethodIconPipe } from '@shared/pipes/payment-method-icon.pipe';
import { StatusIconPipe } from '@shared/pipes/status-icon.pipe';

@Component({
  selector: 'app-transaction-detail-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    CurrencyColombiaPipe,
    DateFormatPipe,
    PaymentMethodIconPipe,
    StatusIconPipe
  ],
  templateUrl: './transaction-detail-modal.component.html',
  styleUrls: ['./transaction-detail-modal.component.scss']
})
export class TransactionDetailModalComponent implements OnInit, OnDestroy {
  isOpen = false;
  transaction: Transaction | null = null;
  
  private destroy$ = new Subject<void>();

  constructor(private transactionStateService: TransactionStateService) {}

  ngOnInit(): void {
    // Suscribirse a cambios en la transacción seleccionada
    this.transactionStateService.selectedTransaction$
      .pipe(takeUntil(this.destroy$))
      .subscribe(transaction => {
        this.transaction = transaction;
        this.isOpen = !!transaction;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  closeModal(): void {
    this.transactionStateService.closeTransactionDetail();
  }
}
