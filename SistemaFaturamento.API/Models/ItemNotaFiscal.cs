using System.ComponentModel.DataAnnotations;

namespace SistemaFaturamento.API.Models
{
    public class ItemNotaFiscal
    {
        [Key]
        public int Id { get; set; }

        public int ProdutoId { get; set; }

        public int Quantidade { get; set; }

        public int NotaFiscalId { get; set; }
    }
}
