import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Módulo compartido con módulos de Angular Material
 * Los pipes y directivas standalone se importan directamente en los componentes
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ]
})
export class SharedModule { }
