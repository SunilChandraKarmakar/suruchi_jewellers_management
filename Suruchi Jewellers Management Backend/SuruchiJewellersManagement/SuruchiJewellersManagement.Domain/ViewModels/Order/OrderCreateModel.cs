using SuruchiJewellersManagement.Domain.ViewModels.OrderDetails;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SuruchiJewellersManagement.Domain.ViewModels.Order
{
    public class OrderCreateModel
    {
        [Required(ErrorMessage = "Please, provied customer.")]
        public int CustomerId { get; set; }

        [Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "Please, provied order number.")]
        public int OrderNumber { get; set; }

        [Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "Please, provied vori.")]
        public int Vori { get; set; }

        [Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "Please, provied ana.")]
        public int Ana { get; set; }

        [Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "Please, provied roti.")]
        public int Roti { get; set; }

        public int? ProductOptionId { get; set; }

        [Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "Please, provied amount.")]
        [DataType(DataType.Currency)]
        public double Amount { get; set; }

        [Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "Please, provied date.")]
        [StringLength(20, MinimumLength = 1)]
        public string Date { get; set; }

        public ICollection<OrderDetailsCreateModel> OrderDetailsCreateModels { get; set; }
    }
}