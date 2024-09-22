using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SuruchiJewellersManagement.Domain.Models
{
    public class OrderDetails
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Please, provied order.")]
        public int OrderId { get; set; }

        [Required(ErrorMessage = "Please, provied type.")]
        public int ProductTypeId { get; set; }

        [Required(ErrorMessage = "Please, provied product.")]
        public int ProductId { get; set; }

        [Required(ErrorMessage = "Please, provied product quantity.")]
        public int ProductQuantityId { get; set; }

        [Column(TypeName = "nvarchar")]
        [StringLength(80)]
        public string? Optional { get; set; }

        public Order Order { get; set; }
        public ProductType ProductType { get; set; }
        public Product Product { get; set; }
        public ProductQuantity ProductQuantity { get; set; }
    }
}