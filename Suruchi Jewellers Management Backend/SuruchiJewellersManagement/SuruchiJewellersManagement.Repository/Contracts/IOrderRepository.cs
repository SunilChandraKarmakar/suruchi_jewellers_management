using SuruchiJewellersManagement.Domain.Models;

namespace SuruchiJewellersManagement.Repository.Contracts
{
    public interface IOrderRepository : IBaseRepository<Order>
    {
        public Task<IEnumerable<Order>> GetAllAsync();
        public Task<Order> GetByIdAsync(int id);
    }
}