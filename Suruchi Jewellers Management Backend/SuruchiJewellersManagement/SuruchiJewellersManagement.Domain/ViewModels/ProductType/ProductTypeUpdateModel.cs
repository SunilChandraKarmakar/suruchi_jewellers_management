using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SuruchiJewellersManagement.Domain.ViewModels.ProductType
{
    public class ProductTypeUpdateModel
    {
        public int Id { get; set; }

        [Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "Please, provied name.")]
        [StringLength(20, MinimumLength = 1)]
        public string Name { get; set; }
    }
}