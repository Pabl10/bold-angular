import { Pipe, PipeTransform } from '@angular/core';
import { PaymentMethod } from '../../core/models/transaction.model';

/**
 * Pipe para obtener el icono del método de pago
 */
@Pipe({
  name: 'paymentMethodIcon',
  standalone: true
})
export class PaymentMethodIconPipe implements PipeTransform {

  /**
   * Transforma un método de pago a su icono correspondiente
   * @param value Método de pago
   * @returns Nombre del icono
   */
  transform(value: PaymentMethod): string {
    const iconMap: Record<PaymentMethod, string> = {
      'CARD': 'credit_card',
      'PSE': 'account_balance',
      'DAVIPLATA': 'phone_android',
      'NEQUI': 'phone_android',
      'BANCOLOMBIA': 'account_balance'
    };

    return iconMap[value] || 'payment';
  }
}
