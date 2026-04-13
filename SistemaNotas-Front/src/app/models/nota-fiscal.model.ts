export enum StatusNota {
    Aberta = 0,
    Fechada = 1
  }
  
  export interface ItemNotaFiscal {
    id?: number;
    produtoId: number;
    quantidade: number;
    notaFiscalId?: number;
  }
  
  export interface NotaFiscal {
    numero: number;
    status: StatusNota;
    itens: ItemNotaFiscal[];
  }