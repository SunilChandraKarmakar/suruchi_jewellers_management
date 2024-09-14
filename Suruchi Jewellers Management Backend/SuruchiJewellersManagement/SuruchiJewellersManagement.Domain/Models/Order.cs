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

        public int Id { get; set; }

        [Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "Please, provied order number.")]
        [DataType(DataType.PhoneNumber)]
        public int OrderNumber { get; set; }

        [Required(ErrorMessage = "Please, provied customer.")]
        public int CustomerId { get; set; }

        [Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "Please, provied amount.")]
        [DataType(DataType.Currency)]
        public double Amount { get; set; }

        [Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "Please, provied day.")]
        [StringLength(3, MinimumLength = 2)]
        public string Day { get; set; }

        [Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "Please, provied month.")]
        [StringLength(3, MinimumLength = 2)]
        public string Month { get; set; }

        [Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "Please, provied year.")]
        [StringLength(4, MinimumLength = 4)]
        public string Year { get; set; }

        [Column(TypeName = "nvarchar")]
        public string Note { get; set; }

        public Customer Customer { get; set; }
        public ICollection<OrderDetails> OrderDetails { get; set; }
    }
}