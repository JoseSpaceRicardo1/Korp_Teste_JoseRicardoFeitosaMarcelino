import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotaFiscal, CriarNotaFiscalDto } from '../models/nota-fiscal.model';

@Injectable({ providedIn: 'root' })
export class NotaFiscalService {
  private apiUrl = 'https://localhost:44340/api/NotaFiscal';

  constructor(private http: HttpClient) {}

  getNotasFiscais(): Observable<NotaFiscal[]> {
    return this.http.get<NotaFiscal[]>(this.apiUrl).pipe(catchError(this.tratarErro));
  }

  enviarNota(nota: CriarNotaFiscalDto): Observable<NotaFiscal> {
    return this.http.post<NotaFiscal>(this.apiUrl, nota).pipe(catchError(this.tratarErro));
  }

  imprimirNota(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/imprimir`, {}).pipe(catchError(this.tratarErro));
  }

  private tratarErro(erro: HttpErrorResponse): Observable<never> {
    let mensagem = 'Erro desconhecido.';
    if (erro.status === 0)
      mensagem = 'Serviço de Faturamento indisponível. Verifique se o servidor está rodando.';
    else if (erro.status === 400)
      mensagem = typeof erro.error === 'string' ? erro.error : (erro.error?.message ?? 'Requisição inválida.');
    else if (erro.status === 404)
      mensagem = 'Nota fiscal não encontrada.';
    else if (erro.status === 503)
      mensagem = 'Serviço de Estoque indisponível. A impressão não foi concluída. Tente novamente em instantes.';
    else if (erro.status >= 500)
      mensagem = 'Erro interno no servidor de Faturamento.';
    return throwError(() => new Error(mensagem));
  }
}