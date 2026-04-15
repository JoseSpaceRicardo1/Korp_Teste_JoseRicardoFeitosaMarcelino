import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { finalize } from 'rxjs/operators';

import { NotaFiscalService } from '../../services/nota-fiscal';
import { NotaFiscal, StatusNota } from '../../models/nota-fiscal.model';

@Component({
  selector: 'app-lista-notas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  templateUrl: './lista-notas.html',
  styleUrl: './lista-notas.css',
})
export class ListaNotasComponent implements OnInit {
  notas: NotaFiscal[] = [];
  colunasExibidas: string[] = ['numero', 'status', 'itens', 'acoes'];
  carregando = false;
  carregandoId: number | null = null;

  StatusNota = StatusNota;

  constructor(
    private notaService: NotaFiscalService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarNotas();
  }

  carregarNotas(): void {
    this.carregando = true;
    this.cdr.markForCheck();

    this.notaService
      .getNotasFiscais()
      .pipe(
        finalize(() => {
          this.carregando = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (dados) => {
          this.notas = dados;
          this.cdr.markForCheck();
        },
        error: (err) => this.mostrarErro(err.message),
      });
  }

  imprimir(nota: NotaFiscal): void {
    this.carregandoId = nota.numero;
    this.cdr.markForCheck();

    this.notaService
      .imprimirNota(nota.numero)
      .pipe(finalize(() => { this.carregandoId = null; this.cdr.markForCheck(); }))
      .subscribe({
        next: () => {
          this.snackBar.open(
            `Nota Nº ${nota.numero} impressa! Estoque atualizado.`,
            'Fechar', { duration: 4000 }
          );
          this.carregarNotas();
        },
        error: (err) => this.mostrarErro(err.message),
      });
  }

  private mostrarErro(msg: string): void {
    this.snackBar.open(`Algo deu errado: ${msg}`, 'Fechar', { duration: 6000 });
  }
}