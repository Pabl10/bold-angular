import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

/**
 * Directiva para detectar clicks fuera del elemento
 */
@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {

  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
