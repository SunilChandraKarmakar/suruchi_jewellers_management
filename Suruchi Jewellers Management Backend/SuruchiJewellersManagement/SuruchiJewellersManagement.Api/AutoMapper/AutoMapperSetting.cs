using AutoMapper;
using SuruchiJewellersManagement.Domain.Models;
using SuruchiJewellersManagement.Domain.ViewModels.Customer;
using SuruchiJewellersManagement.Domain.ViewModels.ProductQuantity;
using SuruchiJewellersManagement.Domain.ViewModels.ProductType;

namespace SuruchiJewellersManagement.Api.AutoMapper
{
    public class AutoMapperSetting : Profile
    {
        public AutoMapperSetting()
        {
            // Customer
            CreateMap<Customer, CustomerViewModel>();
            CreateMap<CustomerViewModel, Customer>();
            CreateMap<Customer, CustomerCreateModel>();
            CreateMap<CustomerCreateModel, Customer>();
            CreateMap<Customer, CustomerUpdateModel>();
            CreateMap<CustomerUpdateModel, Customer>(); 

            // Product type
            CreateMap<ProductType, ProductTypeViewModel>();
            CreateMap<ProductTypeViewModel, ProductType>();
            CreateMap<ProductType, ProductTypeCreateModel>();
            CreateMap<ProductTypeCreateModel, ProductType>();
            CreateMap<ProductType, ProductTypeUpdateModel>();
            CreateMap<ProductTypeUpdateModel, ProductType>();

            // Product quantity
            CreateMap<ProductQuantity, ProductQuantityViewModel>();
            CreateMap<ProductQuantityViewModel, ProductQuantity>();
            CreateMap<ProductQuantity, ProductQuantityCreateModel>();
            CreateMap<ProductQuantityCreateModel, ProductQuantity>();
            CreateMap<ProductQuantity, ProductQuantityUpdateModel>();
            CreateMap<ProductQuantityUpdateModel, ProductQuantity>();
        }
    }
}