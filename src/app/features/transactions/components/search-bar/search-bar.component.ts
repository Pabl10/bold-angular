import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil, debounceTime } from 'rxjs';

import { TransactionStateService } from '@core/services/transaction-state.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  private destroy$ = new Subject<void>();

  constructor(private transactionStateService: TransactionStateService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        this.transactionStateService.setSearchTerm(value || '');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
