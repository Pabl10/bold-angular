import { Pipe, PipeTransform } from '@angular/core';
import { TransactionStatus } from '../../core/models/transaction.model';

/**
 * Pipe para obtener el icono del estado de la transacción
 */
@Pipe({
  name: 'statusIcon',
  standalone: true
})
export class StatusIconPipe implements PipeTransform {

  /**
   * Transforma un estado de transacción a su icono correspondiente
   * @param value Estado de la transacción
   * @returns Nombre del icono
   */
  transform(value: TransactionStatus): string {
    const iconMap: Record<TransactionStatus, string> = {
      'SUCCESSFUL': 'check_circle',
      'REJECTED': 'cancel'
    };

    return iconMap[value] || 'help';
  }
}
