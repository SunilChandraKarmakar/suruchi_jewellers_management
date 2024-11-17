using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SuruchiJewellersManagement.Domain.Models
{
    public class Order
    {
        public Order()
        {
            OrderDetails = new HashSet<OrderDetails>();
        }

        [Key, Required]
        public int Id { get; set; }

        [Required(ErrorMessage = "Please, provied customer.")]
        public int CustomerId { get; set; }

        [Column(TypeName = "nvarchar")]
        [StringLength(20)]
        public string? OrderNumber { get; set; }

        [Column(TypeName = "nvarchar")]
        [StringLength(20)]
        public string? Vori { get; set; }

        [Column(TypeName = "nvarchar")]
        [StringLength(20)]
        public string? Ana { get; set; }

        [Column(TypeName = "nvarchar")]
        [StringLength(20)]
        public string Roti { get; set; }

        public int? ProductOptionId { get; set; }

        [Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "Please, provied amount.")]
        [StringLength(50, MinimumLength = 1)]
        public string Amount { get; set; }

        [Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "Please, provied date.")]
        [StringLength(20, MinimumLength = 1)]
        public string Date { get; set; }

        public Customer Customer { get; set; }
        public ProductOption ProductOption { get; set; }
        public ICollection<OrderDetails> OrderDetails { get; set; }
    }
}