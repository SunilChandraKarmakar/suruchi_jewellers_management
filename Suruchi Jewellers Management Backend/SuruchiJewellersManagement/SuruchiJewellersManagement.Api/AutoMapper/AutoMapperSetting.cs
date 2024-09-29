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
            CreateMap<Order, OrderViewModel>()
                .ForMember(d => d.CustomerName, s => s.MapFrom(m => m.Customer.Name))
                .ForMember(d => d.ProductOptionName, s => s.MapFrom(m => m.ProductOption.Name))
                .ForMember(d => d.OrderDetailsViewModels, s => s.MapFrom(m => m.OrderDetails));
            CreateMap<OrderUpdateModel, Order>()
                .ForMember(d => d.OrderDetails, s => s.MapFrom(m => m.OrderDetailsUpdateModels));
            CreateMap<Order, OrderUpdateModel>()
                .ForMember(o => o.OrderDetailsUpdateModels, s => s.MapFrom(m => m.OrderDetails));

            // Order details
            CreateMap<OrderDetails, OrderCreateModel>();
            CreateMap<OrderDetailsCreateModel, OrderDetails>();
            CreateMap<OrderDetails, OrderDetailsViewModel>()
                .ForMember(d => d.ProductTypeName, s => s.MapFrom(m => m.ProductType.Name))
                .ForMember(d => d.ProductName, s => s.MapFrom(m => m.Product.Name))
                .ForMember(d => d.ProductQuantityName, s => s.MapFrom(m => m.ProductQuantity.Name));
            CreateMap<OrderDetailsUpdateModel, OrderDetails>();
            CreateMap<OrderDetails, OrderDetailsUpdateModel>();
        }
    }
}