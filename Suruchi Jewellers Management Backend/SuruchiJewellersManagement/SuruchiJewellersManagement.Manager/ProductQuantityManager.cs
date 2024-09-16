using SuruchiJewellersManagement.Domain.Models;
using SuruchiJewellersManagement.Manager.Base;
using SuruchiJewellersManagement.Manager.Contracts;
using SuruchiJewellersManagement.Repository.Contracts;

namespace SuruchiJewellersManagement.Manager
{
    public class ProductQuantityManager : BaseManager<ProductQuantity>, IProductQuantityManager
    {
        private readonly IProductQuantityRepository _productQuantityRepository;

        public ProductQuantityManager(IProductQuantityRepository productQuantityRepository) 
            : base(productQuantityRepository) => _productQuantityRepository = productQuantityRepository;
    }
}