import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para formatear moneda colombiana
 */
@Pipe({
  name: 'currencyColombia',
  standalone: true
})
export class CurrencyColombiaPipe implements PipeTransform {

  /**
   * Transforma un número a formato de moneda colombiana
   * @param value Valor numérico (en pesos)
   * @param showSymbol Si mostrar el símbolo de moneda
   * @returns String formateado
   */
  transform(value: number | string, showSymbol: boolean = true): string {
    if (value === null || value === undefined || value === '') {
      return showSymbol ? '$0' : '0';
    }

    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(numericValue)) {
      return showSymbol ? '$0' : '0';
    }

    // El valor ya viene en pesos desde la API, no necesita división
    // Formatear con separadores de miles y decimales
    const formatted = new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numericValue);

    return showSymbol ? `$${formatted}` : formatted;
  }
}
