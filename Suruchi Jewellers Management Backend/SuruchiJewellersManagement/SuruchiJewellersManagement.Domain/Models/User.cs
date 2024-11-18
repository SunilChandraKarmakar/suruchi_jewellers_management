using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace SuruchiJewellersManagement.Domain.Models
{
    public class User 
    {
        [Key, Required]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Please, provied first name.")]
        [StringLength(50, MinimumLength = 2)]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Please, provied last name.")]
        [StringLength(50, MinimumLength = 2)]
        public string LastName { get; set; }

        public string Mobile { get; set; }

        [Required(ErrorMessage = "Please, provied valid email address")]
        [StringLength(100, MinimumLength = 8)]
        [EmailAddress]
        public string Email { get; set; }
    }
}