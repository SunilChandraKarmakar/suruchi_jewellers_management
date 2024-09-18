using SuruchiJewellersManagement.Domain.Models;
using SuruchiJewellersManagement.Repository.Base;
using SuruchiJewellersManagement.Repository.Contracts;

namespace SuruchiJewellersManagement.Repository
{
    public class OrderRepository : BaseRepository<Order>, IOrderRepository
    {
    }
}