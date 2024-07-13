using SuruchiJewellersManagement.Domain.Models;
using SuruchiJewellersManagement.Repository.Base;
using SuruchiJewellersManagement.Repository.Contracts;

namespace SuruchiJewellersManagement.Repository
{
    public class CustomerRepository : BaseRepository<Customer>, ICustomerRepository
    {
    }
}