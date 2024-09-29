using SuruchiJewellersManagement.Domain.ViewModels.OrderDetails;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SuruchiJewellersManagement.Domain.ViewModels.Order
{
    public class OrderUpdateModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Please, provied customer.")]
        public int CustomerId { get; set; }

        [Column(TypeName = "nvarchar")]
        public string? OrderNumber { get; set; }

        [Column(TypeName = "nvarchar")]
        public string? Vori { get; set; }

        [Column(TypeName = "nvarchar")]
        public string? Ana { get; set; }

        [Column(TypeName = "nvarchar")]
        public string Roti { get; set; }

        public int? ProductOptionId { get; set; }

        [Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "Please, provied amount.")]
        public string Amount { get; set; }

        [Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "Please, provied date.")]
        [StringLength(20, MinimumLength = 1)]
        public string Date { get; set; }

        public ICollection<OrderDetailsUpdateModel> OrderDetailsUpdateModels { get; set; }
    }
}