using Microsoft.EntityFrameworkCore;
using SuruchiJewellersManagement.Domain.Models;
using SuruchiJewellersManagement.Repository.Base;
using SuruchiJewellersManagement.Repository.Contracts;

namespace SuruchiJewellersManagement.Repository
{
    public class OrderRepository : BaseRepository<Order>, IOrderRepository
    {
        public async Task<IEnumerable<Order>> GetAllAsync()
        {
            // Get orders
            var getOrders = await dbContext.Orders
                .Include(o => o.Customer)
                .Include(o => o.ProductOption)
                .Include(o => o.OrderDetails)
                    .ThenInclude(od => od.ProductType)
                .Include(o => o.OrderDetails)
                    .ThenInclude(od => od.Product)
                .Include(o => o.OrderDetails)
                    .ThenInclude(od => od.ProductQuantity)
                .ToListAsync();

            return getOrders;
        }  

        public async Task<Order> GetByIdAsync(int id)
        {
            // Get order by id
            var getOrder = await dbContext.Orders
                .Include(o => o.Customer)
                .Include(o => o.ProductOption)
                .Include(o => o.OrderDetails)
                    .ThenInclude(od => od.ProductType)
                .Include(o => o.OrderDetails)
                    .ThenInclude(od => od.Product)
                .Include(o => o.OrderDetails)
                    .ThenInclude(od => od.ProductQuantity)
                .Where(o => o.Id == id)
                .FirstOrDefaultAsync();

            return getOrder;
        }
    }
}