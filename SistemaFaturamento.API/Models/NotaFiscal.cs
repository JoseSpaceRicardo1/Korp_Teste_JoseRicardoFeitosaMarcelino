using System.ComponentModel.DataAnnotations;

namespace SistemaFaturamento.API.Models
{
    public enum StatusNota
    {
        Aberta,
        Fechada
    }
    public class NotaFiscal
    {
        [Key]
        public int Numero { get; set; }

        public StatusNota Status { get; set; } = StatusNota.Aberta;

        public List<ItemNotaFiscal> Itens { get; set; } = new List<ItemNotaFiscal>();
    }
}
