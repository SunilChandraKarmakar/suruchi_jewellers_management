using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SuruchiJewellersManagement.Domain.Models
{
    public class OrderDetails
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Please, provied order.")]
        public int OrderId { get; set; }

        [Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "Please, provied type.")]
        [StringLength(10, MinimumLength = 1)]
        public string Type { get; set; }

        [Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "Please, provied vori.")]
        [StringLength(50, MinimumLength = 1)]
        public string Vori { get; set; }

        [Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "Please, provied ana.")]
        [StringLength(50, MinimumLength = 1)]
        public string Ana { get; set; }

        [Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "Please, provied roti.")]
        [StringLength(50, MinimumLength = 1)]
        public string Roti { get; set; }

        [Column(TypeName = "nvarchar")]
        public string Optional { get; set; }

        public Order Order { get; set; }
    }
}