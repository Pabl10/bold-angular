import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para formatear fechas
 */
@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  /**
   * Transforma un timestamp a formato de fecha legible
   * @param value Timestamp o fecha
   * @param format Formato deseado
   * @returns String formateado
   */
  transform(value: number | string | Date, format: string = 'dd/mm/yyyy - hh:mm'): string {
    if (!value) {
      return '';
    }

    let date: Date;
    
    if (typeof value === 'number') {
      date = new Date(value);
    } else if (typeof value === 'string') {
      date = new Date(value);
    } else {
      date = value;
    }

    if (isNaN(date.getTime())) {
      return '';
    }

    return this.formatDate(date, format);
  }

  /**
   * Formatea la fecha según el formato especificado
   * @param date Fecha a formatear
   * @param format Formato deseado
   * @returns String formateado
   */
  private formatDate(date: Date, format: string): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return format
      .replace('dd', day)
      .replace('mm', month)
      .replace('yyyy', year.toString())
      .replace('hh', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  }
}
