using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SuruchiJewellersManagement.Domain.ViewModels.OrderDetails
{
    public class OrderDetailsCreateModel
    {
        [Required(ErrorMessage = "Please, provied type.")]
        public int ProductTypeId { get; set; }

        [Required(ErrorMessage = "Please, provied product.")]
        public int ProductId { get; set; }

        [Required(ErrorMessage = "Please, provied product quantity.")]
        public int ProductQuantityId { get; set; }

        [Column(TypeName = "nvarchar")]
        public string? Optional { get; set; }
    }
}