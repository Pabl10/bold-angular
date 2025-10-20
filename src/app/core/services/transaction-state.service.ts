import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { 
  Transaction, 
  FilterState, 
  TransactionState, 
  DateFilter, 
  TransactionTypeFilter 
} from '../models/transaction.model';

/**
 * Estado inicial de los filtros
 */
const initialFilterState: FilterState = {
  dateFilter: 'today',
  transactionTypeFilter: ['all'],
  searchTerm: ''
};

/**
 * Estado inicial de las transacciones
 */
const initialTransactionState: TransactionState = {
  transactions: [],
  filteredTransactions: [],
  totalAmount: 0,
  loading: false,
  error: null
};

/**
 * Servicio para manejar el estado de las transacciones y filtros
 * Equivalente a Zustand en React
 */
@Injectable({
  providedIn: 'root'
})
export class TransactionStateService {
  // Estado de las transacciones
  private readonly transactionsSubject = new BehaviorSubject<TransactionState>(initialTransactionState);
  
  // Estado de los filtros
  private readonly filtersSubject = new BehaviorSubject<FilterState>(initialFilterState);

  // Estado de la transacción seleccionada
  private readonly selectedTransactionSubject = new BehaviorSubject<Transaction | null>(null);

  // Observables públicos
  public readonly transactions$ = this.transactionsSubject.asObservable();
  public readonly filters$ = this.filtersSubject.asObservable();
  public readonly selectedTransaction$ = this.selectedTransactionSubject.asObservable();

  // Observables específicos
  public readonly loading$ = this.transactions$.pipe(
    map(state => state.loading),
    distinctUntilChanged()
  );

  public readonly error$ = this.transactions$.pipe(
    map(state => state.error),
    distinctUntilChanged()
  );

  public readonly filteredTransactions$ = this.transactions$.pipe(
    map(state => state.filteredTransactions),
    distinctUntilChanged()
  );

  public readonly totalAmount$ = this.transactions$.pipe(
    map(state => state.totalAmount),
    distinctUntilChanged()
  );

  public readonly dateFilter$ = this.filters$.pipe(
    map(filters => filters.dateFilter),
    distinctUntilChanged()
  );

  public readonly transactionTypeFilter$ = this.filters$.pipe(
    map(filters => filters.transactionTypeFilter),
    distinctUntilChanged()
  );

  public readonly searchTerm$ = this.filters$.pipe(
    map(filters => filters.searchTerm),
    distinctUntilChanged(),
    debounceTime(300)
  );

  constructor() {
    // Cargar filtros desde localStorage
    this.loadFiltersFromStorage();
    
    // Aplicar filtros automáticamente cuando cambien
    this.setupFilterSubscription();
  }

  /**
   * Establece las transacciones
   * @param transactions Lista de transacciones
   */
  setTransactions(transactions: Transaction[]): void {
    const currentState = this.transactionsSubject.value;
    const currentFilters = this.filtersSubject.value;
    
    // Aplicar filtros inmediatamente
    const filteredTransactions = this.filterTransactions(transactions, currentFilters);
    const totalAmount = this.calculateTotalAmount(filteredTransactions);
    
    this.transactionsSubject.next({
      ...currentState,
      transactions,
      filteredTransactions,
      totalAmount,
      loading: false,
      error: null
    });
  }

  /**
   * Establece el estado de carga
   * @param loading Estado de carga
   */
  setLoading(loading: boolean): void {
    const currentState = this.transactionsSubject.value;
    this.transactionsSubject.next({
      ...currentState,
      loading
    });
  }

  /**
   * Establece el error
   * @param error Mensaje de error
   */
  setError(error: string | null): void {
    const currentState = this.transactionsSubject.value;
    this.transactionsSubject.next({
      ...currentState,
      error,
      loading: false
    });
  }

  /**
   * Establece el filtro de fecha
   * @param filter Filtro de fecha
   */
  setDateFilter(filter: DateFilter): void {
    const currentFilters = this.filtersSubject.value;
    this.filtersSubject.next({
      ...currentFilters,
      dateFilter: filter
    });
    this.saveFiltersToStorage();
  }

  /**
   * Establece el filtro de tipo de transacción
   * @param filters Filtros de tipo de transacción
   */
  setTransactionTypeFilter(filters: TransactionTypeFilter[]): void {
    const currentFilters = this.filtersSubject.value;
    this.filtersSubject.next({
      ...currentFilters,
      transactionTypeFilter: filters
    });
    this.saveFiltersToStorage();
  }

  /**
   * Establece el término de búsqueda
   * @param term Término de búsqueda
   */
  setSearchTerm(term: string): void {
    const currentFilters = this.filtersSubject.value;
    this.filtersSubject.next({
      ...currentFilters,
      searchTerm: term
    });
    this.saveFiltersToStorage();
  }

  /**
   * Resetea todos los filtros
   */
  resetFilters(): void {
    this.filtersSubject.next(initialFilterState);
    this.saveFiltersToStorage();
  }

  /**
   * Obtiene el estado actual de las transacciones
   * @returns Estado actual
   */
  getCurrentTransactionState(): TransactionState {
    return this.transactionsSubject.value;
  }

  /**
   * Obtiene el estado actual de los filtros
   * @returns Estado actual de filtros
   */
  getCurrentFilters(): FilterState {
    return this.filtersSubject.value;
  }

  /**
   * Configura la suscripción para aplicar filtros automáticamente
   */
  private setupFilterSubscription(): void {
    // Suscribirse a cambios en los filtros para aplicar filtros automáticamente
    this.filters$.subscribe(() => {
      this.applyFiltersToCurrentState();
    });
  }

  /**
   * Aplica los filtros al estado actual
   */
  private applyFiltersToCurrentState(): void {
    const currentState = this.transactionsSubject.value;
    const currentFilters = this.filtersSubject.value;
    
    if (currentState.transactions.length > 0) {
      const filteredTransactions = this.filterTransactions(currentState.transactions, currentFilters);
      const totalAmount = this.calculateTotalAmount(filteredTransactions);
      
      this.transactionsSubject.next({
        ...currentState,
        filteredTransactions,
        totalAmount
      });
    }
  }

  /**
   * Filtra las transacciones según los filtros aplicados
   * @param transactions Lista de transacciones
   * @param filters Filtros a aplicar
   * @returns Transacciones filtradas
   */
  private filterTransactions(transactions: Transaction[], filters: FilterState): Transaction[] {
    let filtered = [...transactions];

    // Filtro por fecha
    filtered = this.filterByDate(filtered, filters.dateFilter);

    // Filtro por tipo de transacción
    filtered = this.filterByTransactionType(filtered, filters.transactionTypeFilter);

    // Filtro por búsqueda
    if (filters.searchTerm.trim()) {
      filtered = this.filterBySearch(filtered, filters.searchTerm);
    }

    return filtered;
  }

  /**
   * Filtra por fecha
   * @param transactions Lista de transacciones
   * @param dateFilter Filtro de fecha
   * @returns Transacciones filtradas por fecha
   */
  private filterByDate(transactions: Transaction[], dateFilter: DateFilter): Transaction[] {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (dateFilter) {
      case 'today':
        return transactions.filter(t => {
          const transactionDate = new Date(t.createdAt);
          return transactionDate >= today;
        });
      
      case 'week':
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return transactions.filter(t => {
          const transactionDate = new Date(t.createdAt);
          return transactionDate >= weekAgo;
        });
      
      case 'october':
        return transactions.filter(t => {
          const transactionDate = new Date(t.createdAt);
          return transactionDate.getMonth() === 9; // Octubre es el mes 9
        });
      
      default:
        return transactions;
    }
  }

  /**
   * Filtra por tipo de transacción
   * @param transactions Lista de transacciones
   * @param typeFilters Filtros de tipo
   * @returns Transacciones filtradas por tipo
   */
  private filterByTransactionType(transactions: Transaction[], typeFilters: TransactionTypeFilter[]): Transaction[] {
    // Si no hay filtros o está vacío, mostrar todos (como si fuera 'all')
    if (!typeFilters || typeFilters.length === 0 || typeFilters.includes('all')) {
      return transactions;
    }
    
    return transactions.filter(t => {
      if (typeFilters.includes('terminal') && t.salesType === 'TERMINAL') {
        return true;
      }
      if (typeFilters.includes('payment_link') && t.salesType === 'PAYMENT_LINK') {
        return true;
      }
      return false;
    });
  }

  /**
   * Filtra por búsqueda
   * @param transactions Lista de transacciones
   * @param searchTerm Término de búsqueda
   * @returns Transacciones filtradas por búsqueda
   */
  private filterBySearch(transactions: Transaction[], searchTerm: string): Transaction[] {
    const term = searchTerm.toLowerCase();
    
    return transactions.filter(t => 
      t.id.toLowerCase().includes(term) ||
      t.paymentMethod.toLowerCase().includes(term) ||
      t.transactionReference.toString().includes(term) ||
      t.amount.toString().includes(term) ||
      (t.status === 'SUCCESSFUL' ? 'Cobro exitoso' : 'Cobro no realizado').toLowerCase().includes(term)
    );
  }

  /**
   * Calcula el total de las transacciones
   * @param transactions Lista de transacciones
   * @returns Total calculado
   */
  private calculateTotalAmount(transactions: Transaction[]): number {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
  }

  /**
   * Carga los filtros desde localStorage
   */
  private loadFiltersFromStorage(): void {
    try {
      const savedFilters = localStorage.getItem('bold-transactions-filters-angular');
      if (savedFilters) {
        const filters = JSON.parse(savedFilters);
        this.filtersSubject.next(filters);
      }
    } catch (error) {
      console.warn('Error al cargar filtros desde localStorage:', error);
    }
  }

  /**
   * Guarda los filtros en localStorage
   */
  private saveFiltersToStorage(): void {
    try {
      const filters = this.filtersSubject.value;
      localStorage.setItem('bold-transactions-filters-angular', JSON.stringify(filters));
    } catch (error) {
      console.warn('Error al guardar filtros en localStorage:', error);
    }
  }

  /**
   * Selecciona una transacción para mostrar en el panel de detalles
   * @param transaction Transacción a seleccionar
   */
  selectTransaction(transaction: Transaction | null): void {
    this.selectedTransactionSubject.next(transaction);
  }

  /**
   * Cierra el panel de detalles
   */
  closeTransactionDetail(): void {
    this.selectedTransactionSubject.next(null);
  }
}
