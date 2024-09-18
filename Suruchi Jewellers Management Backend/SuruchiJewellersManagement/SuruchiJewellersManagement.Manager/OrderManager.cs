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
    }
}