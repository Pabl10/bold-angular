import { Injectable } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';

import { 
  Transaction, 
  FilterState, 
  DateFilter, 
  TransactionTypeFilter,
  TransactionStats 
} from '../models/transaction.model';

/**
 * Servicio para manejar la lógica de filtrado de transacciones
 */
@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() {}

  /**
   * Filtra las transacciones según los filtros aplicados
   * @param transactions Lista de transacciones
   * @param filters Filtros a aplicar
   * @returns Observable con transacciones filtradas
   */
  filterTransactions(transactions: Transaction[], filters: FilterState): Observable<Transaction[]> {
    return new Observable(observer => {
      let filtered = [...transactions];

      // Aplicar filtro por fecha
      filtered = this.filterByDate(filtered, filters.dateFilter);

      // Aplicar filtro por tipo de transacción
      filtered = this.filterByTransactionType(filtered, filters.transactionTypeFilter);

      // Aplicar filtro por búsqueda
      if (filters.searchTerm.trim()) {
        filtered = this.filterBySearch(filtered, filters.searchTerm);
      }

      observer.next(filtered);
      observer.complete();
    });
  }

  /**
   * Filtra por fecha
   * @param transactions Lista de transacciones
   * @param dateFilter Filtro de fecha
   * @returns Transacciones filtradas por fecha
   */
  filterByDate(transactions: Transaction[], dateFilter: DateFilter): Transaction[] {
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
  filterByTransactionType(transactions: Transaction[], typeFilters: TransactionTypeFilter[]): Transaction[] {
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
  filterBySearch(transactions: Transaction[], searchTerm: string): Transaction[] {
    const term = searchTerm.toLowerCase();
    
    return transactions.filter(t => 
      t.id.toLowerCase().includes(term) ||
      t.paymentMethod.toLowerCase().includes(term) ||
      t.transactionReference.toString().includes(term) ||
      t.amount.toString().includes(term) ||
      t.status.toLowerCase().includes(term)
    );
  }

  /**
   * Calcula estadísticas de las transacciones
   * @param transactions Lista de transacciones
   * @returns Estadísticas calculadas
   */
  calculateStats(transactions: Transaction[]): TransactionStats {
    const totalTransactions = transactions.length;
    const successfulTransactions = transactions.filter(t => t.status === 'SUCCESSFUL').length;
    const rejectedTransactions = transactions.filter(t => t.status === 'REJECTED').length;
    const totalAmount = transactions.reduce((total, t) => total + t.amount, 0);
    const averageAmount = totalTransactions > 0 ? totalAmount / totalTransactions : 0;

    return {
      totalAmount,
      totalTransactions,
      successfulTransactions,
      rejectedTransactions,
      averageAmount
    };
  }

  /**
   * Obtiene las opciones de filtro de fecha
   * @returns Opciones de filtro de fecha
   */
  getDateFilterOptions() {
    return [
      {
        value: 'today' as DateFilter,
        label: 'Hoy',
        description: 'Transacciones del día actual'
      },
      {
        value: 'week' as DateFilter,
        label: 'Esta semana',
        description: 'Últimos 7 días'
      },
      {
        value: 'october' as DateFilter,
        label: 'Octubre',
        description: 'Todo el mes de octubre'
      }
    ];
  }

  /**
   * Obtiene las opciones de filtro de tipo de transacción
   * @returns Opciones de filtro de tipo
   */
  getTransactionTypeFilterOptions() {
    return [
      {
        value: 'all' as TransactionTypeFilter,
        label: 'Ver todos',
        description: 'Mostrar todas las transacciones'
      },
      {
        value: 'terminal' as TransactionTypeFilter,
        label: 'Cobro con datáfono',
        description: 'Transacciones con terminal'
      },
      {
        value: 'payment_link' as TransactionTypeFilter,
        label: 'Cobro con link de pago',
        description: 'Transacciones con link de pago'
      }
    ];
  }

  /**
   * Valida si un filtro de fecha es válido
   * @param filter Filtro a validar
   * @returns True si es válido
   */
  isValidDateFilter(filter: string): filter is DateFilter {
    return ['today', 'week', 'october'].includes(filter);
  }

  /**
   * Valida si un filtro de tipo de transacción es válido
   * @param filter Filtro a validar
   * @returns True si es válido
   */
  isValidTransactionTypeFilter(filter: string): filter is TransactionTypeFilter {
    return ['all', 'terminal', 'payment_link'].includes(filter);
  }

  /**
   * Combina múltiples filtros
   * @param filters Array de funciones de filtro
   * @returns Función de filtro combinada
   */
  combineFilters<T>(filters: ((items: T[]) => T[])[]): (items: T[]) => T[] {
    return (items: T[]) => {
      return filters.reduce((filtered, filter) => filter(filtered), items);
    };
  }

  /**
   * Aplica filtros en secuencia
   * @param transactions Lista de transacciones
   * @param filters Array de funciones de filtro
   * @returns Transacciones filtradas
   */
  applyFiltersInSequence(transactions: Transaction[], filters: ((items: Transaction[]) => Transaction[])[]): Transaction[] {
    return filters.reduce((filtered, filter) => filter(filtered), transactions);
  }
}
