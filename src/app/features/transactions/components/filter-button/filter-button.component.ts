import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ClickOutsideDirective } from '@shared/directives/click-outside.directive';
import { Subject, takeUntil } from 'rxjs';

import { TransactionStateService } from '@core/services/transaction-state.service';
import { TransactionTypeFilter } from '@core/models/transaction.model';

@Component({
  selector: 'app-filter-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCheckboxModule, MatIconModule, ClickOutsideDirective],
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss']
})
export class FilterButtonComponent implements OnInit, OnDestroy {
  isDropdownOpen = false;
  selectedFilters: TransactionTypeFilter[] = ['all'];
  private destroy$ = new Subject<void>();

  constructor(private transactionStateService: TransactionStateService) {}

  ngOnInit(): void {
    this.transactionStateService.transactionTypeFilter$
      .pipe(takeUntil(this.destroy$))
      .subscribe(filters => {
        this.selectedFilters = [...filters];
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  isChecked(filter: TransactionTypeFilter): boolean {
    return this.selectedFilters.includes(filter);
  }

  onFilterChange(filter: TransactionTypeFilter, checked: boolean): void {
    if (filter === 'all') {
      this.selectedFilters = checked ? ['all'] : [];
    } else {
      if (checked) {
        this.selectedFilters = this.selectedFilters.filter(f => f !== 'all');
        this.selectedFilters.push(filter);
      } else {
        this.selectedFilters = this.selectedFilters.filter(f => f !== filter);
        if (this.selectedFilters.length === 0) {
          this.selectedFilters = ['all'];
        }
      }
    }
  }

  applyFilters(): void {
    this.transactionStateService.setTransactionTypeFilter(this.selectedFilters);
    this.closeDropdown();
  }
}
