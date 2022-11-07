using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;



namespace AgenciaAPI.Model
{
    [Table("destinos")]
    public class Destino
    {

        [Column("id")]
        [Required]
        public int Id { get; set; }


        public string Nome { get; set; }


        public string Estado { get; set; }


        public string Pais { get; set; }


        public string dataIda { get; set; }

        public string dataVolta { get; set; }

        public double Valor { get; set; }

        [JsonIgnore]
        public virtual ICollection<Promocao>? Promocoes { get; set; }


    }
}