import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Produto } from '../models/produto.model';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private apiUrl = 'https://localhost:44334/api/Produtos';

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl).pipe(catchError(this.tratarErro));
  }

  salvarProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto).pipe(catchError(this.tratarErro));
  }

  deletarProduto(codigo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${codigo}`).pipe(catchError(this.tratarErro));
  }

  private tratarErro(erro: HttpErrorResponse): Observable<never> {
    let mensagem = 'Erro desconhecido.';
    if (erro.status === 0)
      mensagem = 'Serviço de Estoque indisponível. Verifique se o servidor está rodando.';
    else if (erro.status === 400)
      mensagem = typeof erro.error === 'string' ? erro.error : 'Requisição inválida.';
    else if (erro.status === 404)
      mensagem = 'Produto não encontrado.';
    else if (erro.status >= 500)
      mensagem = 'Erro interno no servidor de Estoque.';
    return throwError(() => new Error(mensagem));
  }
}