using SuruchiJewellersManagement.Domain.Models;
using SuruchiJewellersManagement.Manager.Base;
using SuruchiJewellersManagement.Manager.Contracts;
using SuruchiJewellersManagement.Repository.Contracts;

namespace SuruchiJewellersManagement.Manager
{
    public class OrderManager : BaseManager<Order>, IOrderManager
    {
        private readonly IOrderRepository _orderRepository;

        public OrderManager(IOrderRepository orderRepository) : base(orderRepository) 
            => _orderRepository = orderRepository;

        public async Task<IEnumerable<Order>> GetAllAsync()
        {
            // Get oders
            var getOrders = await _orderRepository.GetAllAsync();
            return getOrders;
        }

        public async Task<Order> GetByIdAsync(int id)
        {
            var getOrder = await _orderRepository.GetByIdAsync(id);
            return getOrder;
        }
    }
}