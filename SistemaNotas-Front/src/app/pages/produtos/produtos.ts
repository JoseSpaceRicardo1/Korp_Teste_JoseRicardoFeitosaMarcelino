import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ProdutoService } from '../../services/produto';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css'
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  colunasExibidas: string[] = ['id', 'codigo', 'descricao', 'saldo'];

  constructor(
    private produtoService: ProdutoService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos() {
    this.produtoService.getProdutos().subscribe({
      next: (dados) => {
        this.produtos = dados;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao buscar produtos:', err)
    });
  }
}