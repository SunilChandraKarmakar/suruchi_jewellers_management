using AutoMapper;
using SuruchiJewellersManagement.Domain.Models;
using SuruchiJewellersManagement.Domain.ViewModels.Customer;
using SuruchiJewellersManagement.Domain.ViewModels.Order;
using SuruchiJewellersManagement.Domain.ViewModels.OrderDetails;
using SuruchiJewellersManagement.Domain.ViewModels.Product;
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

            // Product
            CreateMap<Product, ProductViewModel>();
            CreateMap<ProductViewModel, Product>();
            CreateMap<Product, ProductCreateModel>();
            CreateMap<ProductCreateModel, Product>();
            CreateMap<Product, ProductUpdateModel>();
            CreateMap<ProductUpdateModel, Product>();

            // Order
            CreateMap<Order, OrderCreateModel>()
                .ForMember(d => d.OrderDetailsCreateModels, s => s.MapFrom(m => m.OrderDetails));
            CreateMap<OrderCreateModel, Order>()
                .ForMember(d => d.OrderDetails, s => s.MapFrom(m => m.OrderDetailsCreateModels));

            // Order details
            CreateMap<OrderDetails, OrderCreateModel>();
            CreateMap<OrderDetailsCreateModel, OrderDetails>();
        }
    }
}