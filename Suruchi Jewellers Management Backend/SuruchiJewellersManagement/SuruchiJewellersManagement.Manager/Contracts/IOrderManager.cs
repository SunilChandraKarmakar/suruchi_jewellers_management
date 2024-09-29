using SuruchiJewellersManagement.Domain.Models;

namespace SuruchiJewellersManagement.Manager.Contracts
{
    public interface IOrderManager : IBaseManager<Order>
    {
        public Task<IEnumerable<Order>> GetAllAsync();
        public Task<Order> GetByIdAsync(int id);
    }
}