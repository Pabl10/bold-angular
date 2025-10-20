import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, retry, catchError, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { Transaction, TransactionsResponse } from '../models/transaction.model';

/**
 * Clase de error personalizada para errores de API
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Servicio para manejar las peticiones a la API de transacciones
 */
@Injectable({
  providedIn: 'root'
})
export class TransactionApiService {
  private readonly API_BASE_URL = 'https://bold-fe-api.vercel.app/api';
  private readonly RETRY_COUNT = 3;
  private readonly RETRY_DELAY = 1000;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las transacciones desde la API
   * @returns Observable con las transacciones
   */
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<TransactionsResponse>(this.API_BASE_URL).pipe(
      map(response => response.data),
      retry({
        count: this.RETRY_COUNT,
        delay: (error, retryCount) => {
          console.warn(`Intento ${retryCount} fallido, reintentando...`, error);
          return timer(this.RETRY_DELAY);
        }
      }),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Obtiene una transacción específica por ID
   * @param id ID de la transacción
   * @returns Observable con la transacción
   */
  getTransactionById(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.API_BASE_URL}/${id}`).pipe(
      retry({
        count: this.RETRY_COUNT,
        delay: (error, retryCount) => {
          console.warn(`Intento ${retryCount} fallido, reintentando...`, error);
          return timer(this.RETRY_DELAY);
        }
      }),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Maneja los errores de la API
   * @param error Error HTTP
   * @returns Observable con error
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Error ${error.status}: ${error.message}`;
      
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
    }

    console.error('Error en la API:', error);
    
    return throwError(() => new ApiError(errorMessage, error.status, error));
  }

  /**
   * Simula un delay para testing (opcional)
   * @param ms Milisegundos de delay
   * @returns Promise con delay
   */
  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
