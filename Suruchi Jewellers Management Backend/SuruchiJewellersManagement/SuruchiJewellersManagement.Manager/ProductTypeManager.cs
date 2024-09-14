using SuruchiJewellersManagement.Domain.Models;
using SuruchiJewellersManagement.Manager.Base;
using SuruchiJewellersManagement.Manager.Contracts;
using SuruchiJewellersManagement.Repository.Contracts;

namespace SuruchiJewellersManagement.Manager
{
    public class ProductTypeManager : BaseManager<ProductType>, IProductTypeManager
    {
        private readonly IProductTypeRepository _productTypeRepository;

        public ProductTypeManager(IProductTypeRepository productTypeRepository) : base(productTypeRepository) 
            => _productTypeRepository = productTypeRepository;
    }
}