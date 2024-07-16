using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SuruchiJewellersManagement.Domain.ViewModels.Customer
{
    public class CustomerUpdateModel
    {
        public int Id { get; set; }

        [Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "Please, provied name.")]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; }

        [Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "Please, provied nick name.")]
        [StringLength(10, MinimumLength = 2)]
        public string NickName { get; set; }

        [Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "Please, provied code.")]
        [StringLength(15, MinimumLength = 2)]
        public string Code { get; set; }
    }
}