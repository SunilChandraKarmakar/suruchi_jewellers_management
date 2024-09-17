using SuruchiJewellersManagement.Domain.Models;
using SuruchiJewellersManagement.Manager.Base;
using SuruchiJewellersManagement.Manager.Contracts;
using SuruchiJewellersManagement.Repository.Contracts;

namespace SuruchiJewellersManagement.Manager
{
    public class ProductManager : BaseManager<Product>, IProductManager
    {
        private readonly IProductRepository _productRepository;

        public ProductManager(IProductRepository productRepository) : base(productRepository) 
            =>  _productRepository = productRepository;
    }
}